"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface PortfolioItem {
  link: string;
  image: string;
  alt: string;
}

interface GridIndex {
  row: number;
  col: number;
}

interface Tile {
  id: string;
  gridIndex: GridIndex;
  element: HTMLDivElement | null; // Ref to the actual DOM element
}

const portfolioItemsData: PortfolioItem[] = [
  { link: 'https://kovo-sklo.sk/', image: '/sources/aeb-portfolio/kovo-sklo.sk.webp', alt: 'Kovo Sklo' },
  { link: 'https://lerent.sk/', image: '/sources/aeb-portfolio/lerent.sk.webp', alt: 'Lerent' },
  { link: 'https://legispro.sk/', image: '/sources/aeb-portfolio/legispro.sk.webp', alt: 'Legispro' },
  { link: 'https://falat.sk/', image: '/sources/aeb-portfolio/falat.sk.webp', alt: 'Falat' },
  { link: 'https://zmrdwear.sk/', image: '/sources/aeb-portfolio/zmrdwear.sk.webp', alt: 'Zmrdwear' },
  { link: 'https://www.tristanstudio.sk/', image: '/sources/aeb-portfolio/tristanstudio.sk.webp', alt: 'Tristan Studio' },
  { link: 'https://campro.sk/', image: '/sources/aeb-portfolio/campro.sk.webp', alt: 'Campro' },
  { link: 'https://www.rssp.sk/', image: '/sources/aeb-portfolio/rssp.sk.webp', alt: 'RSSP' },
  { link: 'https://www.veskolfarm.sk/', image: '/sources/aeb-portfolio/veskolfarm.sk.webp', alt: 'Veskol Farm' },
  { link: 'https://www.lemino.sk/', image: '/sources/aeb-portfolio/lemino.sk.webp', alt: 'Lemino' },
  { link: 'https://www.instalatherm.sk/', image: '/sources/aeb-portfolio/instalatherm.sk.webp', alt: 'Instalatherm' },
  { link: 'https://www.kreslimesivankou.sk/', image: '/sources/aeb-portfolio/kreslimesivankou.sk.webp', alt: 'Kreslíme si Vankóu' },
  { link: 'https://www.autocentrumbb.sk/', image: '/sources/aeb-portfolio/autocentrumbb.sk.webp', alt: 'Autocentrum BB' },
  { link: 'https://www.pemavzt.sk/', image: '/sources/aeb-portfolio/pemavzt.sk.webp', alt: 'Pemavzt' },
  { link: 'https://penelcom.sk/', image: '/sources/aeb-portfolio/penelcom.sk.webp', alt: 'Penelcom' },
  { link: 'https://mlresult.sk/', image: '/sources/aeb-portfolio/mlresult.sk.webp', alt: 'MLResult' },
  { link: 'https://atelierkusa.sk/', image: '/sources/aeb-portfolio/atelierkusa.sk.webp', alt: 'Ateliér Kúsa' },
  { link: 'https://nataliyakashyk.sk/', image: '/sources/aeb-portfolio/nataliyakashyk.sk.webp', alt: 'Nataliya Kashyk' },
  { link: 'https://top-interier.sk/', image: '/sources/aeb-portfolio/top-interier.sk.webp', alt: 'Top Interiér' },
  { link: 'https://autocentrummaxi.cz/', image: '/sources/aeb-portfolio/autocentrummaxi.cz.webp', alt: 'Autocentrum Maxi' },
  { link: 'https://holz-haus.sk/', image: '/sources/aeb-portfolio/holzhaus.sk.webp', alt: 'Holzhaus' },
  { link: 'https://raving.sk/', image: '/sources/aeb-portfolio/raving.sk.webp', alt: 'Raving' },
  { link: 'https://wens.sk/', image: '/sources/aeb-portfolio/wens.sk.webp', alt: 'Wens' },
  { link: 'https://mtautos.sk/', image: '/sources/aeb-portfolio/mtautos.sk.webp', alt: 'MT Autos' },
  { link: 'https://autopozicovnamichalovce.sk/', image: '/sources/aeb-portfolio/autopozicovnamichalovce.sk.webp', alt: 'Autopožičovňa Michalovce' },
];

const itemWidth = 300;
const itemHeight = itemWidth * (10 / 16);
const gap = 100;
const buffer = 1; // Number of extra rows/cols to render outside viewport

export function InfiniteGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const gridOffset = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const velocity = useRef({ x: 0, y: 0 });

  // Use a Map to store tiles for efficient lookup and removal
  const tilesRef = useRef<Map<string, Tile>>(new Map());
  const [renderedTiles, setRenderedTiles] = useState<Tile[]>([]);

  const getMatrixItem = useCallback((row: number, col: number): PortfolioItem => {
    const totalItems = portfolioItemsData.length;
    // Coordinate-based hashing using prime multipliers to create a unique staggered pattern
    const hash = Math.abs((row * 739) + (col * 491));
    const index = hash % totalItems;
    return portfolioItemsData[index];
  }, []);

  const createTileElement = useCallback((itemData: PortfolioItem, gridIndex: GridIndex): Tile => {
    const id = `${gridIndex.row}-${gridIndex.col}`;
    const tile: Tile = { id, gridIndex, element: null }; // element will be set via ref callback

    // Create a temporary element to hold the ref, this will be replaced by actual React component in render
    const tempDiv = document.createElement('div');
    tempDiv.className = 'portfolio-item-apple'; // Add original class for styling
    tile.element = tempDiv; // Store the temporary DOM element

    return tile;
  }, []);

  const setupInitialTiles = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientWidth, clientHeight } = container;
    const minRows = Math.ceil(clientHeight / (itemHeight + gap)) + buffer * 2;
    const minCols = Math.ceil(clientWidth / (itemWidth + gap)) + buffer * 2;

    const centerRow = Math.floor(minRows / 2);
    const centerCol = Math.floor(minCols / 2);

    gridOffset.current.x = -centerCol * (itemWidth + gap) + clientWidth / 2;
    gridOffset.current.y = -centerRow * (itemHeight + gap) + clientHeight / 2;

    const newTiles: Tile[] = [];
    tilesRef.current.clear();

    for (let row = 0; row < minRows; row++) {
      for (let col = 0; col < minCols; col++) {
        const itemData = getMatrixItem(row, col);
        const tile = createTileElement(itemData, { row, col });
        tilesRef.current.set(tile.id, tile);
        newTiles.push(tile);
      }
    }
    setRenderedTiles(newTiles);
  }, [getMatrixItem, createTileElement]);

  const updateTiles = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const { clientWidth, clientHeight } = container;

    // Remove tiles that are far outside the viewport
    tilesRef.current.forEach(tile => {
      const x = tile.gridIndex.col * (itemWidth + gap) + gridOffset.current.x;
      const y = tile.gridIndex.row * (itemHeight + gap) + gridOffset.current.y;

      const isOutside = x < -itemWidth - (buffer * (itemWidth + gap)) || x > clientWidth + (buffer * (itemWidth + gap)) ||
        y < -itemHeight - (buffer * (itemHeight + gap)) || y > clientHeight + (buffer * (itemHeight + gap));

      if (isOutside && tile.element) {
        // Here we just remove it from our internal Map, React will handle DOM removal
        tilesRef.current.delete(tile.id);
      }
    });

    // Add new tiles to fill the viewport and buffer zone
    const minRows = Math.ceil(clientHeight / (itemHeight + gap)) + buffer * 2;
    const minCols = Math.ceil(clientWidth / (itemWidth + gap)) + buffer * 2;
    const startRow = Math.floor(-gridOffset.current.y / (itemHeight + gap)) - buffer;
    const startCol = Math.floor(-gridOffset.current.x / (itemWidth + gap)) - buffer;

    const currentRenderedIds = new Set(Array.from(tilesRef.current.keys()));
    const newTilesToAdd: Tile[] = [];

    for (let row = startRow; row < startRow + minRows; row++) {
      for (let col = startCol; col < startCol + minCols; col++) {
        const id = `${row}-${col}`;
        if (!currentRenderedIds.has(id)) {
          const itemData = getMatrixItem(row, col);
          const newTile = createTileElement(itemData, { row, col });
          tilesRef.current.set(id, newTile);
          newTilesToAdd.push(newTile);
        }
      }
    }

    // Update React state to reflect changes in tilesRef
    setRenderedTiles(Array.from(tilesRef.current.values()));

  }, [getMatrixItem, createTileElement]);


  const animate = useCallback(() => {
    if (!isDragging.current) {
      gridOffset.current.x += velocity.current.x;
      gridOffset.current.y += velocity.current.y;
      velocity.current.x *= 0.92; // friction
      velocity.current.y *= 0.92; // friction
    }

    tilesRef.current.forEach(tile => {
      if (tile.element) {
        const x = tile.gridIndex.col * (itemWidth + gap) + gridOffset.current.x;
        const y = tile.gridIndex.row * (itemHeight + gap) + gridOffset.current.y;
        tile.element.style.transform = `translate(${x}px, ${y}px)`;
      }
    });

    if (isDragging.current || Math.abs(velocity.current.x) > 0.1 || Math.abs(velocity.current.y) > 0.1) {
      updateTiles();
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateTiles]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
    lastMousePos.current.x = e.clientX;
    lastMousePos.current.y = e.clientY;
    velocity.current = { x: 0, y: 0 };

    // Hide the drag prompt with fade out
    const dragPrompt = document.getElementById('drag-prompt');
    if (dragPrompt) {
      dragPrompt.style.opacity = '0';
    }
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    gridOffset.current.x += dx;
    gridOffset.current.y += dy;

    velocity.current.x = dx;
    velocity.current.y = dy;

    lastMousePos.current.x = e.clientX;
    lastMousePos.current.y = e.clientY;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  }, []);

  // Handle mobile rendering
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(() => {
    if (isMobile) return; // Don't run desktop grid logic on mobile

    setupInitialTiles();
    animationFrameRef.current = requestAnimationFrame(animate);

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', onMouseDown as any);
      container.addEventListener('mousemove', onMouseMove as any);
      container.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mouseleave', onMouseUp);
      container.style.cursor = 'grab';
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (container) {
        container.removeEventListener('mousedown', onMouseDown as any);
        container.removeEventListener('mousemove', onMouseMove as any);
        container.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mouseleave', onMouseUp);
      }
    };
  }, [isMobile, setupInitialTiles, animate, onMouseDown, onMouseMove, onMouseUp]);


  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        {portfolioItemsData.map((item, index) => (
          <div className="portfolio-item-apple w-full" key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <Image src={item.image} alt={item.alt} width={300} height={188} layout="responsive" className="rounded-none shadow-lg" />
            </a>
          </div>
        ))}
      </div>
    );
  }

  // Desktop rendering
  return (
    <div
      ref={containerRef}
      id="infinite-grid-container"
      className="relative w-full h-[960px] overflow-hidden" // Adjust height as needed
    >
      {renderedTiles.map(tile => {
        const itemData = getMatrixItem(tile.gridIndex.row, tile.gridIndex.col);
        return (
          <div
            key={tile.id}
            className="portfolio-item-apple absolute top-0 left-0"
            style={{ width: itemWidth, height: itemHeight }}
            ref={el => {
              // Attach ref to the actual DOM element for direct manipulation
              if (el) {
                const existingTile = tilesRef.current.get(tile.id);
                if (existingTile) {
                  existingTile.element = el;
                }
              }
            }}
          >
            <a href={itemData.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <Image src={itemData.image} alt={itemData.alt} layout="fill" objectFit="cover" className="rounded-none" />
            </a>
          </div>
        );
      })}
    </div>
  );
}
