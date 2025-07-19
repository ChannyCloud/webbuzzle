import {
  Type,
  Heading1,
  Heading2,
  Link,
  Box,
  Columns,
  Minus,
  MoveHorizontal,
  SquareStack,
  ChevronDown,
  Square,
  ImageIcon,
  FileVideo,
  Music,
  Palette,
  LayoutGrid,
  MapPin,
  ShapesIcon as Form,
  Check,
  Radio,
  Search,
  MessageSquare,
} from "lucide-react"

// Define the component types that can be dragged onto the canvas
export const ELEMENTS = [
  // Text Elements
  {
    category: "text",
    items: [
      { id: "heading", name: "Heading", icon: <Heading1 className="h-5 w-5" /> },
      { id: "subheading", name: "Subheading", icon: <Heading2 className="h-5 w-5" /> },
      { id: "paragraph", name: "Paragraph", icon: <Type className="h-5 w-5" /> },
      { id: "link", name: "Link", icon: <Link className="h-5 w-5" /> },
    ],
  },
  // Structural Elements
  {
    category: "structure",
    items: [
      { id: "container", name: "Container", icon: <Box className="h-5 w-5" /> },
      { id: "columns", name: "Columns", icon: <Columns className="h-5 w-5" /> },
      { id: "divider", name: "Divider", icon: <Minus className="h-5 w-5" /> },
      { id: "spacer", name: "Spacer", icon: <MoveHorizontal className="h-5 w-5" /> },
      { id: "tabs", name: "Tabs", icon: <SquareStack className="h-5 w-5" /> },
      { id: "accordion", name: "Accordion", icon: <ChevronDown className="h-5 w-5" /> },
      { id: "card", name: "Card", icon: <Square className="h-5 w-5" /> },
    ],
  },
  // Media Elements
  {
    category: "media",
    items: [
      { id: "image", name: "Image", icon: <ImageIcon className="h-5 w-5" /> },
      { id: "video", name: "Video", icon: <FileVideo className="h-5 w-5" /> },
      { id: "audio", name: "Audio", icon: <Music className="h-5 w-5" /> },
      { id: "icon", name: "Icon", icon: <Palette className="h-5 w-5" /> },
      { id: "carousel", name: "Carousel", icon: <LayoutGrid className="h-5 w-5" /> },
      { id: "map", name: "Map", icon: <MapPin className="h-5 w-5" /> },
    ],
  },
  // Interactive Elements
  {
    category: "interactive",
    items: [
      { id: "button", name: "Button", icon: <Square className="h-5 w-5" /> },
      { id: "textfield", name: "Text Field", icon: <Form className="h-5 w-5" /> },
      { id: "checkbox", name: "Checkbox", icon: <Check className="h-5 w-5" /> },
      { id: "radio", name: "Radio", icon: <Radio className="h-5 w-5" /> },
      { id: "dropdown", name: "Dropdown", icon: <ChevronDown className="h-5 w-5" /> },
      { id: "slider", name: "Slider", icon: <Minus className="h-5 w-5" /> },
      { id: "search", name: "Search", icon: <Search className="h-5 w-5" /> },
      { id: "progress", name: "Progress", icon: <Minus className="h-5 w-5" /> },
      { id: "social", name: "Social", icon: <MessageSquare className="h-5 w-5" /> },
    ],
  },
]

// Define the sections/categories in the sidebar
export const SECTIONS = [
  { id: "elements", name: "Elements", icon: <Type className="h-5 w-5" /> },
  { id: "layouts", name: "Layouts", icon: <LayoutGrid className="h-5 w-5" /> },
  { id: "pages", name: "Pages", icon: <SquareStack className="h-5 w-5" /> },
]

// Get default content for new elements
export const getDefaultContent = (type: string) => {
  switch (type) {
    case "heading":
      return "New Heading"
    case "subheading":
      return "New Subheading"
    case "paragraph":
      return "New paragraph text. Click to edit this text."
    case "button":
      return "New Button"
    case "link":
      return "New Link"
    case "textfield":
      return "Text Field"
    case "checkbox":
      return "Checkbox Option"
    case "radio":
      return "Radio Option"
    case "dropdown":
      return "Dropdown Menu"
    case "search":
      return "Search"
    case "progress":
      return "50"
    default:
      return ""
  }
}

// Get default style for new elements
export const getDefaultStyle = (type: string) => {
  switch (type) {
    case "heading":
      return { fontSize: "32px", fontWeight: "bold", marginBottom: "16px" }
    case "subheading":
      return { fontSize: "24px", fontWeight: "bold", marginBottom: "12px" }
    case "paragraph":
      return { fontSize: "16px", lineHeight: "1.5", marginBottom: "16px" }
    case "button":
      return { backgroundColor: "#3b82f6", color: "white", padding: "10px 20px", borderRadius: "4px" }
    case "link":
      return { color: "#3b82f6", textDecoration: "underline" }
    case "divider":
      return { borderTop: "1px solid #e5e7eb", margin: "20px 0" }
    case "spacer":
      return { height: "40px" }
    case "image":
      return { width: "100%", height: "200px" }
    case "video":
      return { width: "100%", height: "315px" }
    case "audio":
      return { width: "100%" }
    case "card":
      return { padding: "16px", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#ffffff" }
    case "container":
      return { padding: "20px", border: "1px dashed #e5e7eb", borderRadius: "4px" }
    case "progress":
      return { value: 50 }
    default:
      return {}
  }
}
