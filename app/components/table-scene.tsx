"use client";

import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";
import styles from "../(site)/home.module.css";

type Side = "cream" | "charcoal";
type Piece = { side: Side; haji: boolean };
type Board = (Piece | null)[][];
type Position = { row: number; col: number };
type Move = { from: Position; to: Position; captured: Position[] };

const SIZE = 8;
const moveKey = (position: Position) => `${position.row}:${position.col}`;
const opponent = (side: Side): Side => side === "cream" ? "charcoal" : "cream";

function createBoard(): Board {
  return Array.from({ length: SIZE }, (_, row) => Array.from({ length: SIZE }, (_, col) => {
    if ((row + col) % 2 === 0) return null;
    if (row < 3) return { side: "charcoal", haji: false };
    if (row > 4) return { side: "cream", haji: false };
    return null;
  }));
}

function capturesFor(board: Board, side: Side, origin?: Position): Move[] {
  const captures: Move[] = [];
  const pieces = origin ? [origin] : board.flatMap((line, row) => line.flatMap((piece, col) => piece?.side === side ? [{ row, col }] : []));
  const search = (position: Position, original: Position, captured: Position[], state: Board) => {
    const piece = state[position.row][position.col];
    if (!piece) return;
    const rows = piece.haji ? [-1, 1] : [side === "cream" ? -1 : 1];
    let extended = false;
    for (const dr of rows) for (const dc of [-1, 1]) {
      const enemyRow = position.row + dr;
      const enemyCol = position.col + dc;
      const enemy = state[enemyRow]?.[enemyCol];
      if (!enemy || enemy.side === side) continue;
      let row = enemyRow + dr;
      let col = enemyCol + dc;
      while (state[row]?.[col] === null) {
        extended = true;
        const nextCaptured = [...captured, { row: enemyRow, col: enemyCol }];
        const nextBoard = state.map((line) => line.slice());
        nextBoard[position.row][position.col] = null;
        nextCaptured.forEach((capture) => { nextBoard[capture.row][capture.col] = null; });
        nextBoard[row][col] = piece;
        const before = captures.length;
        search({ row, col }, original, nextCaptured, nextBoard);
        if (captures.length === before) captures.push({ from: original, to: { row, col }, captured: nextCaptured });
        // A regular checker lands on the square immediately beyond its capture.
        // Only a flying haji may choose any farther empty square on that diagonal.
        if (!piece.haji) break;
        row += dr;
        col += dc;
      }
    }
    void extended;
  };
  pieces.forEach((position) => search(position, origin ?? position, [], board));
  if (!captures.length) return [];
  const longest = Math.max(...captures.map((capture) => capture.captured.length));
  return captures.filter((capture) => capture.captured.length === longest);
}

function legalMoves(board: Board, side: Side): Move[] {
  const captures = capturesFor(board, side);
  if (captures.length) return captures;
  const moves: Move[] = [];
  board.forEach((line, row) => line.forEach((piece, col) => {
    if (piece?.side !== side) return;
    const rows = piece.haji ? [-1, 1] : [side === "cream" ? -1 : 1];
    rows.forEach((dr) => [-1, 1].forEach((dc) => {
      let nextRow = row + dr;
      let nextCol = col + dc;
      while (board[nextRow]?.[nextCol] === null) {
        moves.push({ from: { row, col }, to: { row: nextRow, col: nextCol }, captured: [] });
        if (!piece.haji) break;
        nextRow += dr;
        nextCol += dc;
      }
    }));
  }));
  return moves;
}

export function TableScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<Board>(createBoard());
  const turnRef = useRef<Side>("charcoal");
  const gameOverRef = useRef(false);
  const gameStartedRef = useRef(false);
  const selectedRef = useRef<Position | null>(null);
  const playerSideRef = useRef<Side>("cream");
  const computerThinkingRef = useRef(false);
  const [computerThinking, setComputerThinking] = useState(false);
  const [turn, setTurn] = useState<Side>("charcoal");
  const [message, setMessage] = useState("Charcoal moves first — select a piece.");
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [status, setStatus] = useState("Loading 3D table…");
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let computerTimer: number | null = null;
    let cleanup = () => {};

    async function mount() {
      const [T, { GLTFLoader }] = await Promise.all([import("three"), import("three/addons/loaders/GLTFLoader.js")]);
      if (disposed || !host) return;
      const renderer = new T.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.outputColorSpace = T.SRGBColorSpace;
      renderer.toneMapping = T.ACESFilmicToneMapping;
      host.appendChild(renderer.domElement);
      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(38, 1, 0.01, 20);
      camera.position.set(0, 1.6, 1.5);
      const target = new T.Vector3(0, 0.35, 0);
      camera.lookAt(target);
      scene.add(new T.HemisphereLight(0xfff8ef, 0x72624e, 1.6));
      const key = new T.DirectionalLight(0xffefda, 2.4); key.position.set(-2, 4, 3); scene.add(key);
      const fill = new T.DirectionalLight(0xffffff, 1.2); fill.position.set(3, 2, -2); scene.add(fill);

      const tableBounds = new T.Box3();
      const pieceRoot = new T.Group(); pieceRoot.name = "Dam Haji pieces"; scene.add(pieceRoot);
      const markerRoot = new T.Group(); markerRoot.name = "Dam Haji move markers"; scene.add(markerRoot);
      const raycaster = new T.Raycaster();
      const pointer = new T.Vector2();
      const pickables: THREE.Mesh[] = [];
      const squareMap = new Map<string, THREE.Mesh>();
      const pieceTemplates: Partial<Record<"CheckerCream" | "CheckerCharcoal" | "HajiCream" | "HajiCharcoal", THREE.Object3D>> = {};
      const modelScenes: THREE.Object3D[] = [];
      const materials = {
        highlight: new T.MeshBasicMaterial({ color: 0xd8bd70, transparent: true, opacity: 0.68, side: T.DoubleSide }),
        creamLanding: new T.MeshBasicMaterial({ color: 0xa6c78e, transparent: true, opacity: 0.67, side: T.DoubleSide }),
        charcoalLanding: new T.MeshBasicMaterial({ color: 0xe2a85e, transparent: true, opacity: 0.72, side: T.DoubleSide }),
        hit: new T.MeshBasicMaterial({ transparent: true, opacity: 0, side: T.DoubleSide, depthWrite: false }),
      };
      const squareGeometry = new T.PlaneGeometry(0.092, 0.092);
      const markerGeometry = new T.CircleGeometry(0.025, 32);
      const pieceY = 0.366;
      const cell = 0.1;
      const squarePosition = (row: number, col: number) => new T.Vector3((col - 3.5) * cell, 0.366, (row - 3.5) * cell);
      const draw = () => { if (!disposed) renderer.render(scene, camera); };
      const renderPieces = () => {
        pieceRoot.clear(); markerRoot.clear(); pickables.length = 0;
        boardRef.current.forEach((line, row) => line.forEach((piece, col) => {
          if (!piece) return;
          const position = squarePosition(row, col);
          const templateName = `${piece.haji ? "Haji" : "Checker"}${piece.side === "cream" ? "Cream" : "Charcoal"}` as keyof typeof pieceTemplates;
          const template = pieceTemplates[templateName];
          if (!template) return;
          const group = template.clone(true);
          group.position.set(position.x, pieceY, position.z); group.scale.setScalar(1); group.userData.position = { row, col };
          group.traverse((object) => {
            if (!(object instanceof T.Mesh)) return;
            object.userData.position = { row, col }; object.castShadow = true; object.receiveShadow = true; pickables.push(object);
          });
          pieceRoot.add(group);
        }));
        if (gameStartedRef.current && turnRef.current === playerSideRef.current && !gameOverRef.current && !computerThinkingRef.current) legalMoves(boardRef.current, turnRef.current).forEach((move) => {
          const position = squarePosition(move.to.row, move.to.col);
          const marker = new T.Mesh(markerGeometry, turnRef.current === "cream" ? materials.creamLanding : materials.charcoalLanding); marker.rotation.x = -Math.PI / 2; marker.position.set(position.x, 0.369, position.z); markerRoot.add(marker);
        });
        if (selectedRef.current) {
          const position = squarePosition(selectedRef.current.row, selectedRef.current.col);
          const ring = new T.Mesh(new T.RingGeometry(0.038, 0.046, 32), materials.highlight); ring.rotation.x = -Math.PI / 2; ring.position.set(position.x, 0.3695, position.z); markerRoot.add(ring);
        }
        draw();
      };
      const applyMove = (move: Move) => {
        const board = boardRef.current.map((line) => line.slice());
        const moving = board[move.from.row][move.from.col];
        if (!moving) return;
        board[move.from.row][move.from.col] = null;
        move.captured.forEach((capture) => { board[capture.row][capture.col] = null; });
        const crowned = !moving.haji && ((moving.side === "cream" && move.to.row === 0) || (moving.side === "charcoal" && move.to.row === 7));
        board[move.to.row][move.to.col] = { ...moving, haji: moving.haji || crowned };
        boardRef.current = board;
        selectedRef.current = null;
        const nextSide = opponent(turnRef.current);
        turnRef.current = nextSide;
        setTurn(nextSide);
        const count = { cream: 0, charcoal: 0 };
        board.flat().forEach((piece) => { if (piece) count[piece.side] += 1; });
        const capturedAll = count[nextSide] === 0;
        const blocked = !capturedAll && legalMoves(board, nextSide).length === 0;
        const finished = capturedAll || blocked;
        gameOverRef.current = finished;
        setGameOver(finished);
        if (finished) {
          computerThinkingRef.current = false;
          setComputerThinking(false);
          setMessage(capturedAll
            ? `${moving.side === playerSideRef.current ? "You win" : "Computer wins"} — all opposing pieces are captured.`
            : "Draw — the next player has no legal moves.");
        } else if (nextSide !== playerSideRef.current) {
          computerThinkingRef.current = true;
          setComputerThinking(true);
          setMessage("Computer is thinking…");
          scheduleComputerMove();
        } else {
          computerThinkingRef.current = false;
          setComputerThinking(false);
          setMessage(crowned ? "Naik haji! Choose a move." : "Choose a move.");
        }
        renderPieces();
      };
      const scheduleComputerMove = () => {
        if (!gameStartedRef.current || gameOverRef.current || turnRef.current === playerSideRef.current || computerTimer !== null) return;
        computerThinkingRef.current = true;
        setComputerThinking(true);
        setMessage("Computer is thinking…");
        renderPieces();
        computerTimer = window.setTimeout(() => {
          computerTimer = null;
          if (disposed || gameOverRef.current || turnRef.current === playerSideRef.current) return;
          const moves = legalMoves(boardRef.current, turnRef.current);
          if (!moves.length) {
            gameOverRef.current = true;
            setGameOver(true);
            computerThinkingRef.current = false;
            setComputerThinking(false);
            setMessage("Draw — the computer has no legal moves.");
            renderPieces();
            return;
          }
          const move = moves[Math.floor(Math.random() * moves.length)];
          computerThinkingRef.current = false;
          setComputerThinking(false);
          applyMove(move);
        }, 650);
      };
      const reset = () => {
        if (computerTimer !== null) window.clearTimeout(computerTimer);
        computerTimer = null;
        boardRef.current = createBoard(); turnRef.current = "charcoal"; selectedRef.current = null; gameOverRef.current = false; computerThinkingRef.current = false;
        setTurn("charcoal"); setGameOver(false); setComputerThinking(false);
        setMessage(playerSideRef.current === "charcoal" ? "Black moves first." : "Computer is thinking…");
        renderPieces();
        if (gameStartedRef.current && playerSideRef.current === "cream") scheduleComputerMove();
      };
      resetRef.current = reset;
      if (gameStartedRef.current) reset();

      const onPointerDown = (event: PointerEvent) => {
        if (!gameStartedRef.current || gameOverRef.current || computerThinkingRef.current || turnRef.current !== playerSideRef.current) return;
        const rect = renderer.domElement.getBoundingClientRect();
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects([...pickables, ...squareMap.values()], false)[0];
        if (!hit) return;
        const position = hit.object.userData.position as Position | undefined;
        if (!position) return;
        const selected = selectedRef.current;
        const moves = legalMoves(boardRef.current, turnRef.current);
        const options = moves.filter((move) => moveKey(move.from) === moveKey(selected ?? position));
        const move = selected && options.find((candidate) => moveKey(candidate.to) === moveKey(position));
        if (move) {
          applyMove(move);
          return;
        }
        const piece = boardRef.current[position.row][position.col];
        if (piece?.side === turnRef.current && moves.some((candidate) => moveKey(candidate.from) === moveKey(position))) {
          selectedRef.current = position;
          setMessage(moves.some((candidate) => candidate.captured.length) ? "A capture is compulsory — choose a highlighted landing square." : "Choose a highlighted destination.");
          renderPieces();
        } else if (selected) {
          selectedRef.current = null; setMessage(`${turnRef.current === "cream" ? "Cream" : "Charcoal"} to move.`); renderPieces();
        }
      };

      const resize = () => {
        const { width, height } = host.getBoundingClientRect(); if (!width || !height) return;
        renderer.setSize(width, height); camera.aspect = width / height;
        if (!tableBounds.isEmpty()) {
          camera.lookAt(target);
          const inverse = camera.quaternion.clone().invert();
          const direction = camera.position.clone().sub(target).normalize();
          const tangent = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
          let distance = 0;
          for (const x of [tableBounds.min.x, tableBounds.max.x]) for (const y of [tableBounds.min.y, tableBounds.max.y]) for (const z of [tableBounds.min.z, tableBounds.max.z]) {
            const corner = new T.Vector3(x, y, z).sub(target).applyQuaternion(inverse);
            distance = Math.max(distance, corner.z + 1.08 * Math.max(Math.abs(corner.x) / (tangent * camera.aspect), Math.abs(corner.y) / tangent));
          }
          camera.position.copy(target).addScaledVector(direction, distance);
        }
        camera.updateProjectionMatrix(); draw();
      };
      const observer = new ResizeObserver(resize); observer.observe(host);
      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      renderer.domElement.style.cursor = "pointer";
      const lost = (event: Event) => { event.preventDefault(); setStatus("The 3D view was interrupted. Reload to try again."); };
      renderer.domElement.addEventListener("webglcontextlost", lost);
      cleanup = () => {
        if (computerTimer !== null) window.clearTimeout(computerTimer);
        observer.disconnect(); renderer.domElement.removeEventListener("pointerdown", onPointerDown); renderer.domElement.removeEventListener("webglcontextlost", lost);
        renderer.dispose(); renderer.domElement.remove();
        const geometries = new Set<THREE.BufferGeometry>();
        const sceneMaterials = new Set<THREE.Material>();
        [...modelScenes, scene].forEach((root) => root.traverse((object) => {
          if (!(object instanceof T.Mesh)) return;
          geometries.add(object.geometry);
          for (const material of Array.isArray(object.material) ? object.material : [object.material]) sceneMaterials.add(material);
        }));
        geometries.forEach((geometry) => geometry.dispose());
        sceneMaterials.forEach((material) => material.dispose());
        [squareGeometry, markerGeometry].forEach((geometry) => geometry.dispose());
        Object.values(materials).forEach((material) => material.dispose());
      };
      resize();
      const loader = new GLTFLoader();
      const [gltf, pieceGltf] = await Promise.all([
        loader.loadAsync("/models/wooden-chess-table.glb"),
        loader.loadAsync("/models/dam-haji-pieces.glb"),
      ]);
      if (disposed) return;
      scene.add(gltf.scene); tableBounds.setFromObject(gltf.scene);
      modelScenes.push(pieceGltf.scene);
      for (const name of ["CheckerCream", "CheckerCharcoal", "HajiCream", "HajiCharcoal"] as const) {
        const template = pieceGltf.scene.getObjectByName(name);
        if (template) pieceTemplates[name] = template;
      }
      if (Object.keys(pieceTemplates).length !== 4) throw new Error("Blender piece models are missing from the exported GLB.");
      // The exported inlay is centred at (0, 0, .364), spans .8 m, and has 10 cm squares.
      for (let row = 0; row < SIZE; row++) for (let col = 0; col < SIZE; col++) {
        const position = squarePosition(row, col);
        const targetMesh = new T.Mesh(squareGeometry, materials.hit);
        targetMesh.rotation.x = -Math.PI / 2; targetMesh.position.set(position.x, 0.368, position.z); targetMesh.userData.position = { row, col };
        scene.add(targetMesh); squareMap.set(moveKey({ row, col }), targetMesh);
      }
      // Transparent square meshes are included in the raycast list for empty squares.
      renderPieces(); resize(); setStatus("");
    }

    void mount().catch(() => { cleanup(); if (!disposed) setStatus("The 3D table or game could not load. Please reload to try again."); });
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <div className={styles.tableBackground}>
      <div className={styles.tableCanvas} ref={hostRef} role="application" aria-label="Interactive 3D Dam Haji board on a wooden table. Click your pieces and highlighted squares to move." />
      {!gameStarted && <div className={styles.gameStartOverlay}>
        <div className={styles.gameStartCard} role="group" aria-label="Choose your side">
          <div className={styles.gameStartChoices}>
            <button type="button" className={`${styles.gameStartChoice} ${styles.creamChoice}`} onClick={() => {
              playerSideRef.current = "cream";
              gameStartedRef.current = true;
              setGameStarted(true);
              resetRef.current();
            }}>White</button>
            <button type="button" className={`${styles.gameStartChoice} ${styles.charcoalChoice}`} onClick={() => {
              playerSideRef.current = "charcoal";
              gameStartedRef.current = true;
              setGameStarted(true);
              resetRef.current();
            }}>Black</button>
          </div>
        </div>
      </div>}
      <p className="sr-only" role="status" aria-live="polite">
        {status || (gameStarted
          ? `${gameOver ? message.startsWith("Draw") ? "Draw" : "Game over" : computerThinking ? "Computer thinking" : `${turn === "cream" ? "White" : "Black"} to move`}. ${message}`
          : "Choose White or Black to begin." )}
      </p>
    </div>
  );
}
