"use client"

import { Droppable, Draggable } from "react-beautiful-dnd"
import { renderElement } from "./element-renderer"

interface CanvasProps {
  viewMode: string
  elements: any[]
  selectedElement: any
  handleElementSelect: (element: any) => void
}

export function Canvas({ viewMode, elements, selectedElement, handleElementSelect }: CanvasProps) {
  return (
    <div className="flex-1 bg-gray-100 overflow-auto">
      <div
        className={`mx-auto bg-white shadow-sm my-4 transition-all duration-300 ${
          viewMode === "mobile" ? "max-w-sm" : viewMode === "tablet" ? "max-w-2xl" : "max-w-5xl"
        }`}
      >
        <Droppable droppableId="canvas">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[calc(100vh-8rem)] p-4">
              {elements.map((element, index) => (
                <Draggable key={element.id} draggableId={element.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`p-2 my-2 rounded-md relative ${
                        selectedElement && selectedElement.id === element.id
                          ? "outline outline-2 outline-blue-500"
                          : "hover:outline hover:outline-1 hover:outline-gray-300"
                      }`}
                      onClick={() => handleElementSelect(element)}
                    >
                      {renderElement(element)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {elements.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-md">
                  <p className="text-gray-500">Drag elements here or select a layout template</p>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  )
}
