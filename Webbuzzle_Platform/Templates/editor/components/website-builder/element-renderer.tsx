import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronRight, FileVideo, ImageIcon, MapPin, Music, Palette, Play, Search } from "lucide-react"

// Render element on canvas
export const renderElement = (element: any) => {
  switch (element.type) {
    case "heading":
      return <h1 style={element.style}>{element.content}</h1>
    case "subheading":
      return <h2 style={element.style}>{element.content}</h2>
    case "paragraph":
      return <p style={element.style}>{element.content}</p>
    case "button":
      return (
        <button className="cursor-pointer" style={element.style}>
          {element.content}
        </button>
      )
    case "link":
      return (
        <a href="#" style={element.style}>
          {element.content}
        </a>
      )
    case "image":
      return (
        <div className="bg-gray-200 flex items-center justify-center" style={{ height: "200px", ...element.style }}>
          <ImageIcon className="h-10 w-10 text-gray-400" />
        </div>
      )
    case "video":
      return (
        <div className="bg-gray-200 flex items-center justify-center" style={{ height: "315px", ...element.style }}>
          <FileVideo className="h-10 w-10 text-gray-400" />
          <Play className="h-10 w-10 text-gray-400 absolute" />
        </div>
      )
    case "audio":
      return (
        <div className="bg-gray-100 p-4 rounded flex items-center" style={element.style}>
          <Music className="h-6 w-6 text-gray-400 mr-2" />
          <div className="flex-1 h-2 bg-gray-200 rounded">
            <div className="h-full w-1/3 bg-blue-500 rounded"></div>
          </div>
          <Play className="h-6 w-6 text-gray-400 ml-2" />
        </div>
      )
    case "divider":
      return <hr style={element.style} />
    case "spacer":
      return <div style={{ height: "50px", ...element.style }}></div>
    case "container":
      return (
        <div className="border border-dashed border-gray-300 p-4 rounded" style={element.style}>
          {element.children ? (
            element.children.map((child: any) => (
              <div key={child.id} className="my-2">
                {renderElement(child)}
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-center">Container (Drag elements here)</div>
          )}
        </div>
      )
    case "columns":
      return (
        <div className="grid grid-cols-2 gap-4" style={element.style}>
          {element.children ? (
            element.children.map((child: any) => (
              <div key={child.id} className="border border-dashed border-gray-200 p-2 rounded">
                {renderElement(child)}
              </div>
            ))
          ) : (
            <>
              <div className="border border-dashed border-gray-200 p-4 rounded text-gray-400 text-center">Column 1</div>
              <div className="border border-dashed border-gray-200 p-4 rounded text-gray-400 text-center">Column 2</div>
            </>
          )}
        </div>
      )
    case "tabs":
      return (
        <div style={element.style}>
          <div className="flex border-b">
            <div className="px-4 py-2 border-b-2 border-blue-500 font-medium">Tab 1</div>
            <div className="px-4 py-2 text-gray-500">Tab 2</div>
            <div className="px-4 py-2 text-gray-500">Tab 3</div>
          </div>
          <div className="p-4 border border-t-0 rounded-b">Tab content goes here</div>
        </div>
      )
    case "accordion":
      return (
        <div style={element.style}>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Accordion Item 1</AccordionTrigger>
              <AccordionContent>Content for accordion item 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Accordion Item 2</AccordionTrigger>
              <AccordionContent>Content for accordion item 2</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )
    case "card":
      return (
        <div className="border rounded-lg p-4 bg-white" style={element.style}>
          {element.children ? (
            element.children.map((child: any) => (
              <div key={child.id} className="my-2">
                {renderElement(child)}
              </div>
            ))
          ) : (
            <>
              <h3 className="text-lg font-medium mb-2">Card Title</h3>
              <p className="text-gray-500">Card content goes here</p>
            </>
          )}
        </div>
      )
    case "textfield":
      return <Input placeholder="Text input" style={element.style} />
    case "checkbox":
      return (
        <div className="flex items-center space-x-2" style={element.style}>
          <Checkbox id={`checkbox-${element.id}`} />
          <Label htmlFor={`checkbox-${element.id}`}>{element.content}</Label>
        </div>
      )
    case "radio":
      return (
        <RadioGroup defaultValue="option-1" style={element.style}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id={`radio-1-${element.id}`} />
            <Label htmlFor={`radio-1-${element.id}`}>Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id={`radio-2-${element.id}`} />
            <Label htmlFor={`radio-2-${element.id}`}>Option 2</Label>
          </div>
        </RadioGroup>
      )
    case "dropdown":
      return (
        <Select style={element.style}>
          <SelectTrigger>
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      )
    case "slider":
      return <Slider defaultValue={[50]} max={100} step={1} style={element.style} />
    case "search":
      return (
        <div className="relative" style={element.style}>
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search..." className="pl-8" />
        </div>
      )
    case "progress":
      return <Progress value={Number.parseInt(element.content) || 50} style={element.style} />
    case "social":
      return (
        <div className="flex space-x-2" style={element.style}>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">f</div>
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white">t</div>
          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">i</div>
          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white">y</div>
        </div>
      )
    case "map":
      return (
        <div className="bg-gray-200 rounded relative overflow-hidden" style={{ height: "300px", ...element.style }}>
          <div className="absolute inset-0 opacity-20 bg-[url('/placeholder.svg?height=600&width=800')]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <MapPin className="h-8 w-8 text-red-500" />
          </div>
        </div>
      )
    case "icon":
      return (
        <div className="flex justify-center" style={element.style}>
          <Palette className="h-8 w-8 text-gray-500" />
        </div>
      )
    case "carousel":
      return (
        <div className="relative rounded overflow-hidden" style={{ height: "300px", ...element.style }}>
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <ImageIcon className="h-10 w-10 text-gray-400" />
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
            <ChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )
    default:
      return null
  }
}
