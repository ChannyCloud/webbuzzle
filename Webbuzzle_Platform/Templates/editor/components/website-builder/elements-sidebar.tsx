"use client"

import { useState } from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { Button } from "@/components/ui/button"
import { ELEMENTS, SECTIONS } from "@/components/data/elements"
import { LAYOUTS } from "@/components/data/layouts"
import { CircleSlash, Plus, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"

interface ElementsSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
  handleAddLayout: (layoutId: string) => void
}

export function ElementsSidebar({ activeSection, setActiveSection, handleAddLayout }: ElementsSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter elements based on search term
  const filterElements = (items) => {
    if (!searchTerm) return items
    return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  return (
    <div className="w-64 border-r bg-white flex flex-col">
      <div className="p-2 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search elements..."
            className="pl-8 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue={activeSection} onValueChange={setActiveSection} className="flex-1 flex flex-col">
        <div className="border-b p-2">
          <TabsList className="w-full">
            {SECTIONS.map((section) => (
              <TabsTrigger key={section.id} value={section.id} className="flex items-center">
                {section.icon}
                <span className="ml-1 text-xs hidden sm:inline">{section.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="elements" className="m-0 p-0 h-full">
            <Accordion type="multiple" defaultValue={ELEMENTS.map((cat) => cat.category)} className="px-2">
              {ELEMENTS.map((category) => (
                <AccordionItem key={category.category} value={category.category}>
                  <AccordionTrigger className="py-2 text-sm font-medium capitalize">
                    {category.category}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Droppable droppableId={`elements-${category.category}`} isDropDisabled={true}>
                      {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="grid grid-cols-2 gap-1.5">
                          {filterElements(category.items).map((element, index) => (
                            <Draggable key={element.id} draggableId={element.id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="border rounded-md p-1.5 flex flex-col items-center justify-center bg-white hover:bg-gray-50 cursor-grab active:cursor-grabbing"
                                >
                                  {element.icon}
                                  <span className="text-xs mt-1">{element.name}</span>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="layouts" className="m-0 h-full">
            <div className="space-y-2 p-2">
              <h3 className="text-sm font-medium">Layout Templates</h3>
              <div className="grid grid-cols-1 gap-2">
                {LAYOUTS.map((layout) => (
                  <div
                    key={layout.id}
                    className="border rounded-md p-2 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAddLayout(layout.id)}
                  >
                    <div className="flex items-center">
                      {layout.icon}
                      <span className="ml-2 font-medium text-sm">{layout.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{layout.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pages" className="m-0 h-full">
            <div className="space-y-2 p-2">
              <h3 className="text-sm font-medium">Pages</h3>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-100">
                  <span className="text-sm">Home</span>
                  <CircleSlash className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded border">
                  <span className="text-sm">About</span>
                  <CircleSlash className="h-4 w-4 text-gray-400" />
                </div>
                <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded border">
                  <span className="text-sm">Contact</span>
                  <CircleSlash className="h-4 w-4 text-gray-400" />
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Page
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
