"use client"

import { useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import { getDefaultContent, getDefaultStyle } from "@/components/data/elements"
import { generateLayoutPreset } from "@/components/data/layouts"
import { ElementsSidebar } from "@/components/website-builder/elements-sidebar"
import { Canvas } from "@/components/website-builder/canvas"
import { PropertiesPanel } from "@/components/website-builder/properties-panel"
import { Header } from "@/components/website-builder/header"
import { Footer } from "@/components/website-builder/footer"
import { ELEMENTS } from "@/components/data/elements"

export default function WebsiteBuilder() {
  const [activeSection, setActiveSection] = useState("elements")
  const [selectedElement, setSelectedElement] = useState(null)
  const [viewMode, setViewMode] = useState("desktop")
  const [elements, setElements] = useState([
    {
      id: "heading-1",
      type: "heading",
      content: "Welcome to My Website",
      style: { fontSize: "32px", textAlign: "center" },
    },
    {
      id: "paragraph-1",
      type: "paragraph",
      content: "This is a sample text block. Edit this text to add your own content.",
      style: { fontSize: "16px" },
    },
    {
      id: "button-1",
      type: "button",
      content: "Click Me",
      style: { backgroundColor: "#3b82f6", color: "white", padding: "10px 20px", borderRadius: "4px" },
    },
  ])

  // Handle drag end event
  const handleDragEnd = (result) => {
    if (!result.destination) return

    // If dragging from elements to canvas
    if (result.source.droppableId.startsWith("elements-") && result.destination.droppableId === "canvas") {
      const categoryId = result.source.droppableId.split("-")[1]
      const category = ELEMENTS.find((cat) => cat.category === categoryId)
      if (category) {
        const element = category.items.find((el, index) => index === result.source.index)
        if (element) {
          const newId = `${element.id}-${Date.now()}`
          const newElement = {
            id: newId,
            type: element.id,
            content: getDefaultContent(element.id),
            style: getDefaultStyle(element.id),
          }

          const newElements = [...elements]
          newElements.splice(result.destination.index, 0, newElement)
          setElements(newElements)
          setSelectedElement(newElement)
        }
      }
    }
    // If reordering within canvas
    else if (result.source.droppableId === "canvas" && result.destination.droppableId === "canvas") {
      const newElements = [...elements]
      const [removed] = newElements.splice(result.source.index, 1)
      newElements.splice(result.destination.index, 0, removed)
      setElements(newElements)
    }
  }

  // Handle element selection
  const handleElementSelect = (element) => {
    setSelectedElement(element)
  }

  // Handle element content update
  const handleContentChange = (id, content) => {
    setElements(elements.map((el) => (el.id === id ? { ...el, content } : el)))

    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({ ...selectedElement, content })
    }
  }

  // Handle element style update
  const handleStyleChange = (id, property, value) => {
    setElements(
      elements.map((el) =>
        el.id === id
          ? {
              ...el,
              style: { ...el.style, [property]: value },
            }
          : el,
      ),
    )

    if (selectedElement && selectedElement.id === id) {
      setSelectedElement({
        ...selectedElement,
        style: { ...selectedElement.style, [property]: value },
      })
    }
  }

  // Handle element deletion
  const handleDeleteElement = (id) => {
    setElements(elements.filter((el) => el.id !== id))
    if (selectedElement && selectedElement.id === id) {
      setSelectedElement(null)
    }
  }

  // Add a layout preset
  const handleAddLayout = (layoutId) => {
    const newElements = generateLayoutPreset(layoutId)
    if (newElements.length > 0) {
      setElements([...elements, ...newElements])
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <Header viewMode={viewMode} setViewMode={setViewMode} />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Elements */}
          <ElementsSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            handleAddLayout={handleAddLayout}
          />

          {/* Center - Canvas */}
          <Canvas
            viewMode={viewMode}
            elements={elements}
            selectedElement={selectedElement}
            handleElementSelect={handleElementSelect}
          />

          {/* Right Sidebar - Properties */}
          <div className="w-72 border-l bg-white overflow-y-auto">
            <PropertiesPanel
              selectedElement={selectedElement}
              handleContentChange={handleContentChange}
              handleStyleChange={handleStyleChange}
              handleDeleteElement={handleDeleteElement}
            />
          </div>
        </div>
      </DragDropContext>

      {/* Footer */}
      <Footer />
    </div>
  )
}
