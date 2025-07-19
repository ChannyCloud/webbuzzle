import { Box, LayoutGrid, Columns, Minus, PanelLeft, SquareStack, ChevronDown } from "lucide-react"

// Define the layout presets
export const LAYOUTS = [
  {
    id: "hero",
    name: "Hero Layout",
    description: "Large image/video header with CTA and tagline",
    icon: <Box className="h-5 w-5" />,
  },
  {
    id: "grid",
    name: "Grid Layout",
    description: "Evenly spaced blocks great for products or blog posts",
    icon: <LayoutGrid className="h-5 w-5" />,
  },
  {
    id: "zigzag",
    name: "Zig-Zag Layout",
    description: "Alternating image and text, good for storytelling sections",
    icon: <Columns className="h-5 w-5" />,
  },
  {
    id: "single-column",
    name: "Single Column",
    description: "Great for mobile-first or minimalist designs",
    icon: <Minus className="h-5 w-5" />,
  },
  {
    id: "multi-column",
    name: "Multi-Column",
    description: "Useful for comparing features or showing multiple products",
    icon: <Columns className="h-5 w-5" />,
  },
  {
    id: "sidebar",
    name: "Sidebar Layout",
    description: "Navigation or filters on the left/right, content on the other side",
    icon: <PanelLeft className="h-5 w-5" />,
  },
  {
    id: "card-based",
    name: "Card-Based Layout",
    description: "Modular design blocks (like Pinterest or modern eCommerce)",
    icon: <SquareStack className="h-5 w-5" />,
  },
  {
    id: "full-page",
    name: "Full-Page Scroll",
    description: "Each scroll lands the user on a new full-screen section",
    icon: <ChevronDown className="h-5 w-5" />,
  },
]

// Generate layout presets
export const generateLayoutPreset = (layoutId: string) => {
  let newElements = []

  switch (layoutId) {
    case "hero":
      newElements = [
        {
          id: `container-${Date.now()}`,
          type: "container",
          content: "",
          style: { padding: "40px 20px", backgroundColor: "#f8fafc", textAlign: "center" },
          children: [
            {
              id: `heading-${Date.now() + 1}`,
              type: "heading",
              content: "Welcome to Our Website",
              style: { fontSize: "48px", fontWeight: "bold", marginBottom: "16px" },
            },
            {
              id: `paragraph-${Date.now() + 2}`,
              type: "paragraph",
              content: "A stunning hero section with a call to action button.",
              style: { fontSize: "18px", marginBottom: "24px" },
            },
            {
              id: `button-${Date.now() + 3}`,
              type: "button",
              content: "Get Started",
              style: {
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "12px 24px",
                borderRadius: "4px",
                fontSize: "16px",
              },
            },
          ],
        },
      ]
      break

    case "grid":
      newElements = [
        {
          id: `container-${Date.now()}`,
          type: "container",
          content: "",
          style: { padding: "40px 20px" },
          children: [
            {
              id: `heading-${Date.now() + 1}`,
              type: "heading",
              content: "Our Services",
              style: { fontSize: "32px", fontWeight: "bold", marginBottom: "24px", textAlign: "center" },
            },
            {
              id: `columns-${Date.now() + 2}`,
              type: "columns",
              content: "",
              style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
              children: [
                {
                  id: `card-${Date.now() + 3}`,
                  type: "card",
                  content: "",
                  style: { padding: "20px", border: "1px solid #e5e7eb", borderRadius: "8px" },
                  children: [
                    {
                      id: `subheading-${Date.now() + 4}`,
                      type: "subheading",
                      content: "Service 1",
                      style: { fontSize: "20px", fontWeight: "bold", marginBottom: "12px" },
                    },
                    {
                      id: `paragraph-${Date.now() + 5}`,
                      type: "paragraph",
                      content: "Description of service 1 goes here.",
                      style: { fontSize: "16px" },
                    },
                  ],
                },
                {
                  id: `card-${Date.now() + 6}`,
                  type: "card",
                  content: "",
                  style: { padding: "20px", border: "1px solid #e5e7eb", borderRadius: "8px" },
                  children: [
                    {
                      id: `subheading-${Date.now() + 7}`,
                      type: "subheading",
                      content: "Service 2",
                      style: { fontSize: "20px", fontWeight: "bold", marginBottom: "12px" },
                    },
                    {
                      id: `paragraph-${Date.now() + 8}`,
                      type: "paragraph",
                      content: "Description of service 2 goes here.",
                      style: { fontSize: "16px" },
                    },
                  ],
                },
                {
                  id: `card-${Date.now() + 9}`,
                  type: "card",
                  content: "",
                  style: { padding: "20px", border: "1px solid #e5e7eb", borderRadius: "8px" },
                  children: [
                    {
                      id: `subheading-${Date.now() + 10}`,
                      type: "subheading",
                      content: "Service 3",
                      style: { fontSize: "20px", fontWeight: "bold", marginBottom: "12px" },
                    },
                    {
                      id: `paragraph-${Date.now() + 11}`,
                      type: "paragraph",
                      content: "Description of service 3 goes here.",
                      style: { fontSize: "16px" },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]
      break

    case "zigzag":
      newElements = [
        {
          id: `container-${Date.now()}`,
          type: "container",
          content: "",
          style: { padding: "40px 20px" },
          children: [
            {
              id: `columns-${Date.now() + 1}`,
              type: "columns",
              content: "",
              style: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "40px",
                alignItems: "center",
                marginBottom: "60px",
              },
              children: [
                {
                  id: `image-${Date.now() + 2}`,
                  type: "image",
                  content: "",
                  style: { width: "100%", height: "300px", backgroundColor: "#e5e7eb", borderRadius: "8px" },
                },
                {
                  id: `container-${Date.now() + 3}`,
                  type: "container",
                  content: "",
                  style: { padding: "0" },
                  children: [
                    {
                      id: `subheading-${Date.now() + 4}`,
                      type: "subheading",
                      content: "Feature One",
                      style: { fontSize: "24px", fontWeight: "bold", marginBottom: "16px" },
                    },
                    {
                      id: `paragraph-${Date.now() + 5}`,
                      type: "paragraph",
                      content:
                        "Description of feature one goes here. This is a zig-zag layout with alternating image and text sections.",
                      style: { fontSize: "16px", marginBottom: "16px" },
                    },
                    {
                      id: `button-${Date.now() + 6}`,
                      type: "button",
                      content: "Learn More",
                      style: { backgroundColor: "#3b82f6", color: "white", padding: "8px 16px", borderRadius: "4px" },
                    },
                  ],
                },
              ],
            },
            {
              id: `columns-${Date.now() + 7}`,
              type: "columns",
              content: "",
              style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "center" },
              children: [
                {
                  id: `container-${Date.now() + 8}`,
                  type: "container",
                  content: "",
                  style: { padding: "0" },
                  children: [
                    {
                      id: `subheading-${Date.now() + 9}`,
                      type: "subheading",
                      content: "Feature Two",
                      style: { fontSize: "24px", fontWeight: "bold", marginBottom: "16px" },
                    },
                    {
                      id: `paragraph-${Date.now() + 10}`,
                      type: "paragraph",
                      content:
                        "Description of feature two goes here. Notice how the image is now on the right side for visual interest.",
                      style: { fontSize: "16px", marginBottom: "16px" },
                    },
                    {
                      id: `button-${Date.now() + 11}`,
                      type: "button",
                      content: "Learn More",
                      style: { backgroundColor: "#3b82f6", color: "white", padding: "8px 16px", borderRadius: "4px" },
                    },
                  ],
                },
                {
                  id: `image-${Date.now() + 12}`,
                  type: "image",
                  content: "",
                  style: { width: "100%", height: "300px", backgroundColor: "#e5e7eb", borderRadius: "8px" },
                },
              ],
            },
          ],
        },
      ]
      break

    default:
      return []
  }

  return newElements
}
