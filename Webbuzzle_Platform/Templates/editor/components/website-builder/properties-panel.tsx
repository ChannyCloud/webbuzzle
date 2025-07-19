"use client"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Link,
  Minus,
  Palette,
  Settings,
  Underline,
  Upload,
} from "lucide-react"

interface PropertiesPanelProps {
  selectedElement: any
  handleContentChange: (id: string, content: string) => void
  handleStyleChange: (id: string, property: string, value: string) => void
  handleDeleteElement: (id: string) => void
}

export function PropertiesPanel({
  selectedElement,
  handleContentChange,
  handleStyleChange,
  handleDeleteElement,
}: PropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-gray-500 flex flex-col items-center justify-center h-full">
        <Palette className="h-10 w-10 mb-2 text-gray-400" />
        <h3 className="font-medium">No Element Selected</h3>
        <p className="text-sm mt-1">Select an element to edit its properties</p>
      </div>
    )
  }

  // Helper to render the appropriate content editor based on element type
  const renderContentEditor = () => {
    switch (selectedElement.type) {
      case "heading":
      case "subheading":
      case "button":
      case "link":
        return (
          <div className="space-y-2">
            <Label>Text</Label>
            <Input
              value={selectedElement.content}
              onChange={(e) => handleContentChange(selectedElement.id, e.target.value)}
            />
          </div>
        )
      case "paragraph":
        return (
          <div className="space-y-2">
            <Label>Text</Label>
            <Textarea
              value={selectedElement.content}
              onChange={(e) => handleContentChange(selectedElement.id, e.target.value)}
              rows={4}
            />
          </div>
        )
      case "progress":
        return (
          <div className="space-y-2">
            <Label>Progress Value (%)</Label>
            <div className="flex items-center">
              <Slider
                defaultValue={[Number.parseInt(selectedElement.content) || 50]}
                max={100}
                step={1}
                onValueChange={(value) => handleContentChange(selectedElement.id, value[0].toString())}
                className="flex-1 mr-2"
              />
              <div className="w-12 text-center text-sm">{selectedElement.content || 50}%</div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  // Helper to render style editors based on element type
  const renderStyleEditor = () => {
    const commonStyles = (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Margin</Label>
          <Select
            defaultValue={selectedElement.style.margin || "0"}
            onValueChange={(value) => handleStyleChange(selectedElement.id, "margin", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select margin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">None</SelectItem>
              <SelectItem value="5px">Small (5px)</SelectItem>
              <SelectItem value="10px">Medium (10px)</SelectItem>
              <SelectItem value="20px">Large (20px)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    )

    switch (selectedElement.type) {
      case "heading":
      case "subheading":
      case "paragraph":
      case "link":
        return (
          <>
            <div className="space-y-2">
              <Label>Font Size</Label>
              <div className="flex items-center">
                <Slider
                  defaultValue={[Number.parseInt(selectedElement.style.fontSize) || 16]}
                  max={72}
                  step={1}
                  onValueChange={(value) => handleStyleChange(selectedElement.id, "fontSize", `${value[0]}px`)}
                  className="flex-1 mr-2"
                />
                <div className="w-12 text-center text-sm">
                  {Number.parseInt(selectedElement.style.fontSize) || 16}px
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Text Alignment</Label>
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${selectedElement.style.textAlign === "left" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStyleChange(selectedElement.id, "textAlign", "left")}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${selectedElement.style.textAlign === "center" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStyleChange(selectedElement.id, "textAlign", "center")}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${selectedElement.style.textAlign === "right" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStyleChange(selectedElement.id, "textAlign", "right")}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Text Style</Label>
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${selectedElement.style.fontWeight === "bold" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStyleChange(selectedElement.id, "fontWeight", "bold")}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${selectedElement.style.fontStyle === "italic" ? "bg-gray-100" : ""}`}
                  onClick={() => handleStyleChange(selectedElement.id, "fontStyle", "italic")}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex-1 rounded-none ${
                    selectedElement.style.textDecoration === "underline" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => handleStyleChange(selectedElement.id, "textDecoration", "underline")}
                >
                  <Underline className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Text Color</Label>
              <div className="flex">
                <div
                  className="w-8 h-8 rounded-md border mr-2"
                  style={{ backgroundColor: selectedElement.style.color || "#000000" }}
                ></div>
                <Input
                  value={selectedElement.style.color || "#000000"}
                  onChange={(e) => handleStyleChange(selectedElement.id, "color", e.target.value)}
                />
              </div>
            </div>
            {commonStyles}
          </>
        )

      case "button":
        return (
          <>
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex">
                <div
                  className="w-8 h-8 rounded-md border mr-2"
                  style={{ backgroundColor: selectedElement.style.backgroundColor || "#3b82f6" }}
                ></div>
                <Input
                  value={selectedElement.style.backgroundColor || "#3b82f6"}
                  onChange={(e) => handleStyleChange(selectedElement.id, "backgroundColor", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Text Color</Label>
              <div className="flex">
                <div
                  className="w-8 h-8 rounded-md border mr-2"
                  style={{ backgroundColor: selectedElement.style.color || "white" }}
                ></div>
                <Input
                  value={selectedElement.style.color || "white"}
                  onChange={(e) => handleStyleChange(selectedElement.id, "color", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Border Radius</Label>
              <div className="flex items-center">
                <Slider
                  defaultValue={[Number.parseInt(selectedElement.style.borderRadius) || 4]}
                  max={20}
                  step={1}
                  onValueChange={(value) => handleStyleChange(selectedElement.id, "borderRadius", `${value[0]}px`)}
                  className="flex-1 mr-2"
                />
                <div className="w-12 text-center text-sm">
                  {Number.parseInt(selectedElement.style.borderRadius) || 4}px
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Padding</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Horizontal</Label>
                  <Select
                    defaultValue={selectedElement.style.paddingLeft || "20px"}
                    onValueChange={(value) => handleStyleChange(selectedElement.id, "paddingLeft", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Padding X" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="8px">Small (8px)</SelectItem>
                      <SelectItem value="16px">Medium (16px)</SelectItem>
                      <SelectItem value="24px">Large (24px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Vertical</Label>
                  <Select
                    defaultValue={selectedElement.style.paddingTop || "10px"}
                    onValueChange={(value) => handleStyleChange(selectedElement.id, "paddingTop", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Padding Y" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4px">Small (4px)</SelectItem>
                      <SelectItem value="8px">Medium (8px)</SelectItem>
                      <SelectItem value="12px">Large (12px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {commonStyles}
          </>
        )

      case "image":
      case "video":
      case "map":
      case "carousel":
        return (
          <>
            <div className="space-y-2">
              <Label>Dimensions</Label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs">Width</Label>
                  <Select
                    defaultValue={selectedElement.style.width || "100%"}
                    onValueChange={(value) => handleStyleChange(selectedElement.id, "width", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Width" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="100%">Full Width</SelectItem>
                      <SelectItem value="75%">75% Width</SelectItem>
                      <SelectItem value="50%">50% Width</SelectItem>
                      <SelectItem value="25%">25% Width</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs">Height</Label>
                  <Select
                    defaultValue={selectedElement.style.height || "300px"}
                    onValueChange={(value) => handleStyleChange(selectedElement.id, "height", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Height" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="200px">Small (200px)</SelectItem>
                      <SelectItem value="300px">Medium (300px)</SelectItem>
                      <SelectItem value="400px">Large (400px)</SelectItem>
                      <SelectItem value="500px">Extra Large (500px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {commonStyles}
          </>
        )

      case "spacer":
        return (
          <>
            <div className="space-y-2">
              <Label>Height</Label>
              <div className="flex items-center">
                <Slider
                  defaultValue={[Number.parseInt(selectedElement.style.height) || 40]}
                  max={200}
                  step={10}
                  onValueChange={(value) => handleStyleChange(selectedElement.id, "height", `${value[0]}px`)}
                  className="flex-1 mr-2"
                />
                <div className="w-16 text-center text-sm">{Number.parseInt(selectedElement.style.height) || 40}px</div>
              </div>
            </div>
            {commonStyles}
          </>
        )

      case "container":
        return (
          <>
            <div className="space-y-2">
              <Label>Background Color</Label>
              <div className="flex">
                <div
                  className="w-8 h-8 rounded-md border mr-2"
                  style={{
                    backgroundColor: selectedElement.style.backgroundColor || "transparent",
                  }}
                ></div>
                <Input
                  value={selectedElement.style.backgroundColor || ""}
                  placeholder="transparent"
                  onChange={(e) => handleStyleChange(selectedElement.id, "backgroundColor", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Border</Label>
              <div className="grid grid-cols-2 gap-2">
                <Select
                  defaultValue={selectedElement.style.border || "1px solid #e5e7eb"}
                  onValueChange={(value) => handleStyleChange(selectedElement.id, "border", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Border style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="1px solid #e5e7eb">Solid</SelectItem>
                    <SelectItem value="1px dashed #e5e7eb">Dashed</SelectItem>
                    <SelectItem value="2px solid #e5e7eb">Thick</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  defaultValue={selectedElement.style.borderRadius || "4px"}
                  onValueChange={(value) => handleStyleChange(selectedElement.id, "borderRadius", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Border radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    <SelectItem value="4px">Small (4px)</SelectItem>
                    <SelectItem value="8px">Medium (8px)</SelectItem>
                    <SelectItem value="12px">Large (12px)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Padding</Label>
              <Select
                defaultValue={selectedElement.style.padding || "20px"}
                onValueChange={(value) => handleStyleChange(selectedElement.id, "padding", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select padding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="10px">Small (10px)</SelectItem>
                  <SelectItem value="20px">Medium (20px)</SelectItem>
                  <SelectItem value="40px">Large (40px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {commonStyles}
          </>
        )

      case "divider":
        return (
          <>
            <div className="space-y-2">
              <Label>Style</Label>
              <Select
                defaultValue={selectedElement.style.borderTop || "1px solid #e5e7eb"}
                onValueChange={(value) => handleStyleChange(selectedElement.id, "borderTop", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Line style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1px solid #e5e7eb">Solid</SelectItem>
                  <SelectItem value="1px dashed #e5e7eb">Dashed</SelectItem>
                  <SelectItem value="2px solid #e5e7eb">Thick</SelectItem>
                  <SelectItem value="3px solid #e5e7eb">Extra Thick</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {commonStyles}
          </>
        )

      case "columns":
        return (
          <>
            <div className="space-y-2">
              <Label>Column Layout</Label>
              <Select
                defaultValue={selectedElement.style.gridTemplateColumns || "1fr 1fr"}
                onValueChange={(value) => handleStyleChange(selectedElement.id, "gridTemplateColumns", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Column layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1fr 1fr">Two Equal Columns</SelectItem>
                  <SelectItem value="1fr 1fr 1fr">Three Equal Columns</SelectItem>
                  <SelectItem value="2fr 1fr">Left Wide (2:1)</SelectItem>
                  <SelectItem value="1fr 2fr">Right Wide (1:2)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Gap Between Columns</Label>
              <Select
                defaultValue={selectedElement.style.gap || "20px"}
                onValueChange={(value) => handleStyleChange(selectedElement.id, "gap", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Gap size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8px">Small (8px)</SelectItem>
                  <SelectItem value="16px">Medium (16px)</SelectItem>
                  <SelectItem value="24px">Large (24px)</SelectItem>
                  <SelectItem value="32px">Extra Large (32px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {commonStyles}
          </>
        )

      default:
        return commonStyles
    }
  }

  return (
    <div className="p-3 h-full overflow-y-auto">
      <h3 className="font-medium mb-3 flex items-center">
        <Settings className="h-4 w-4 mr-2" />
        Element Properties
      </h3>

      <Accordion type="single" collapsible defaultValue="content" className="w-full">
        <AccordionItem value="content">
          <AccordionTrigger className="py-2 text-sm font-medium">Content</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {renderContentEditor()}

            {(selectedElement.type === "button" || selectedElement.type === "link") && (
              <div className="space-y-2">
                <Label>Link</Label>
                <div className="flex">
                  <Input placeholder="https://" />
                  <Button variant="ghost" size="icon" className="ml-1">
                    <Link className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {selectedElement.type === "image" && (
              <div className="space-y-2">
                <Label>Image Source</Label>
                <div className="flex">
                  <Input placeholder="https://" />
                  <Button variant="ghost" size="icon" className="ml-1">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pt-2">
                  <Label>Alt Text</Label>
                  <Input placeholder="Image description" className="mt-1" />
                </div>
              </div>
            )}

            {selectedElement.type === "video" && (
              <div className="space-y-2">
                <Label>Video URL</Label>
                <Input placeholder="https://youtube.com/..." />
                <p className="text-xs text-gray-500">Supports YouTube, Vimeo, and direct video file URLs</p>
              </div>
            )}

            {selectedElement.type === "audio" && (
              <div className="space-y-2">
                <Label>Audio URL</Label>
                <Input placeholder="https://..." />
                <p className="text-xs text-gray-500">Supports direct audio file URLs or SoundCloud embeds</p>
              </div>
            )}

            {selectedElement.type === "map" && (
              <div className="space-y-2">
                <Label>Map Location</Label>
                <Input placeholder="Address or coordinates" />
                <div className="pt-2">
                  <Label>Zoom Level</Label>
                  <Select defaultValue="14">
                    <SelectTrigger>
                      <SelectValue placeholder="Select zoom level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10 - City</SelectItem>
                      <SelectItem value="14">14 - District</SelectItem>
                      <SelectItem value="16">16 - Streets</SelectItem>
                      <SelectItem value="18">18 - Buildings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {selectedElement.type === "icon" && (
              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="grid grid-cols-4 gap-2 border rounded-md p-2">
                  {["heart", "star", "thumbs-up", "bell", "home", "settings", "mail", "user"].map((icon, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 flex items-center justify-center border rounded hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="h-5 w-5 bg-gray-300 rounded-sm"></div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="w-full mt-1">
                  Browse More Icons
                </Button>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="style">
          <AccordionTrigger className="py-2 text-sm font-medium">Style</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">{renderStyleEditor()}</AccordionContent>
        </AccordionItem>

        <AccordionItem value="advanced">
          <AccordionTrigger className="py-2 text-sm font-medium">Advanced</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Element ID</Label>
              <Input value={selectedElement.id} disabled />
            </div>

            <div className="space-y-2">
              <Label>CSS Classes</Label>
              <Input placeholder="Enter custom classes" />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch id="hidden-mobile" />
              <Label htmlFor="hidden-mobile">Hide on mobile</Label>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch id="hidden-tablet" />
              <Label htmlFor="hidden-tablet">Hide on tablet</Label>
            </div>

            <div className="pt-4">
              <Button variant="destructive" size="sm" onClick={() => handleDeleteElement(selectedElement.id)}>
                <Minus className="h-4 w-4 mr-1" />
                Remove Element
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
