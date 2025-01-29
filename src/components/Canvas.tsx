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
    selectedShapeType,
    handleWheel,
    handleDrag,
    handleCanvasClick,
    updateShapeProperties,
    setSelectedShapeId,
    selectShapeType,
    } = useCanvasLogic();

    return (
    <div style={{ display: "flex" }}>
        <Menu
        selectedShapeType={selectedShapeType} 
        onSelectShapeType={selectShapeType} 
        selectedShape={shapes.find((shape) => shape.id === selectedShapeId)}
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