import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqAccordionProps {
  items: { id: string; content: string }[];
  companyName: string;
}

// Helper to convert FAQ HTML into accordion items
export const FaqAccordion = ({ items, companyName }: FaqAccordionProps) => {
  if (items.length === 0) {
    // Fallback: show the original HTML in a single accordion panel
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="faq">
          <AccordionTrigger className="text-[26px] font-bold flex items-center ">
            FAQ Directory From All {companyName}
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="text-[20px]"
              dangerouslySetInnerHTML={{ __html: items }}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((it, idx) => (
        <AccordionItem value={`item-${idx}`} key={idx}>
          <AccordionTrigger className="text-[26px] font-bold flex items-center">
            FAQ Directory From All {companyName}
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="prose prose-sm max-w-none text-[20px]"
              dangerouslySetInnerHTML={{ __html: it.content }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

type FaqItem = { q: string; a: string; aIsHtml: boolean };

export const parseFaqHtml = (html: string): FaqItem[] => {
  // Use DOMParser in the browser; safe in Next.js client components
  if (typeof window === "undefined") return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  // Normalize strong tags that are direct children to block-level wrappers
  const container = doc.body;

  // Gather potential question nodes
  const headerSelectors = "h2,h3";
  const headers = Array.from(container.querySelectorAll(headerSelectors));

  // If no h2/h3, try strong tags that are the first child of a block
  let questionNodes: Element[] = headers;
  if (questionNodes.length === 0) {
    const strongBlocks = Array.from(container.querySelectorAll("strong"));
    // Use <strong> as a question only if it starts a block (e.g., <p><strong>Q</strong> ...</p>)
    questionNodes = strongBlocks.filter((el) => {
      const parent = el.parentElement;
      if (!parent) return false;
      // strong must be the first node in its parent
      const firstSignificant = Array.from(parent.childNodes).find(
        (n) => !(n.nodeType === Node.TEXT_NODE && !n.textContent?.trim()),
      );
      return firstSignificant === el;
    });
  }

  if (questionNodes.length === 0) return [];

  // Build items by collecting content until the next question node
  const items: FaqItem[] = [];
  for (let i = 0; i < questionNodes.length; i++) {
    const qNode = questionNodes[i];
    const nextQ = questionNodes[i + 1] || null;

    // Question text
    const qText = qNode.textContent?.trim() || `Question ${i + 1}`;

    // Answer: siblings after qNode, up to (but not including) next question node
    const answerParts: string[] = [];
    let walker = qNode.nextSibling;
    while (walker && walker !== nextQ) {
      // Serialize node HTML
      if (walker.nodeType === Node.ELEMENT_NODE) {
        answerParts.push((walker as Element).outerHTML);
      } else if (walker.nodeType === Node.TEXT_NODE) {
        const txt = walker.textContent?.trim();
        if (txt) answerParts.push(txt);
      }
      walker = walker.nextSibling;
    }

    const answerHtml = answerParts.join("").trim();
    if (!answerHtml) continue;

    items.push({
      q: qText,
      a: answerHtml,
      aIsHtml: true,
    });
  }

  return items;
};
