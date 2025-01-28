import React from "react";
import { CanvasLayout } from "./CanvasLayout";
import { Menu } from "./Menu";
import { useCanvasLogic } from "../hooks/useCanvasLogic";

export const Canvas: React.FC = () => {
    const {
    scale,
    position,
    shapes,
    selectedShapeId,
    handleWheel,
    handleDrag,
    handleCanvasClick,
    updateShapeProperties,
    setSelectedShapeId,
    addShape,
    } = useCanvasLogic();

    return (
    <div style={{ display: "flex" }}>
        <Menu
        selectedShape={shapes.find((shape) => shape.id === selectedShapeId)}
        onAddShape={addShape}
        onUpdateShape={updateShapeProperties}
        />
        <CanvasLayout
        scale={scale}
        position={position}
        shapes={shapes}
        onWheel={handleWheel}
        onDragMove={handleDrag}
        onCanvasClick={handleCanvasClick}
        onUpdateShape={updateShapeProperties}
        onSelectShape={setSelectedShapeId}
        />
    </div>
    );
};