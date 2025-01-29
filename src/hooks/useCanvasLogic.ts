import { useState } from "react";
import { KonvaEventObject } from "konva/lib/Node";
import { Shape } from "../types/index";

export const useCanvasLogic = () => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [selectedShapeId, setSelectedShapeId] = useState<string | null>(null);
    const [selectedShapeType, setSelectedShapeType] = useState<Shape["type"]>("rectangle");


    const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
        e.evt.preventDefault();
        const stage = e.target.getStage();
        if (!stage) return;

        const oldScale = stage.scaleX();
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
        };

      const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;
        setScale(newScale);

        setPosition({
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
        });
    };

    const handleDrag = (e: KonvaEventObject<DragEvent>) => {
        const stage = e.target.getStage();
        if (!stage) return;
        setPosition({ x: stage.x(), y: stage.y() });
    };

    const handleCanvasClick = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e.target.getStage();
        if (!stage) return;
        
        const pointer = stage.getPointerPosition();
        if (!pointer) return;

        setShapes((prev) => [
        ...prev,
        {
            id: `shape-${prev.length}`,
            type: selectedShapeType,
            x: (pointer.x - stage.x()) / stage.scaleX(),
            y: (pointer.y - stage.y()) / stage.scaleY(),
            width: 100,
            height: 100,
            fill: selectedShapeType === "circle" ? "red" : selectedShapeType === "triangle" ? "green" : "blue",
        },
    ]);
    };

    const selectShapeType = (type: Shape["type"]) => {
        setSelectedShapeType(type);
    };

    const updateShapeProperties = (id: string, newProperties: Partial<Shape>) => {
        setShapes((prev) =>
        prev.map((shape) => (shape.id === id ? { ...shape, ...newProperties } : shape))
        );
    };
    

    return {
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
    };
    };