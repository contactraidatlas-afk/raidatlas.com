import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ActivityFAQProps {
  activityId: string
}

const faqData = {
  "sunset-quad-adventure": [
    {
      question: "What should I wear for the quad biking experience?",
      answer:
        "We recommend wearing comfortable, closed-toe shoes, long pants, and bringing a light jacket for the evening. Sunglasses and sunscreen are also essential. We provide helmets and safety equipment.",
    },
    {
      question: "Do I need previous quad biking experience?",
      answer:
        "No previous experience is required! Our professional guides will provide a comprehensive safety briefing and basic training before the adventure begins. The tour is suitable for beginners.",
    },
    {
      question: "What happens if the weather is bad?",
      answer:
        "Safety is our priority. In case of severe weather conditions, we will reschedule your tour or provide a full refund. Light rain or wind typically doesn't affect the tour.",
    },
    {
      question: "Is hotel pickup included?",
      answer:
        "Yes, we provide complimentary pickup and drop-off from most hotels in Marrakech. Please provide your hotel details when booking, and we'll confirm the pickup time.",
    },
    {
      question: "What's the minimum age for this activity?",
      answer:
        "The minimum age is 16 years old. Participants under 18 must be accompanied by an adult and have parental consent.",
    },
  ],
  "desert-discovery-tour": [
    {
      question: "How physically demanding is this tour?",
      answer:
        "The tour is moderately physical. You'll be riding quad bikes for several hours with breaks. Basic fitness is recommended, but it's suitable for most people in reasonable health.",
    },
    {
      question: "What's included in the traditional lunch?",
      answer:
        "The traditional Berber lunch includes tagine, couscous, fresh bread, seasonal vegetables, and mint tea. We can accommodate dietary restrictions with advance notice.",
    },
    {
      question: "Can I bring my camera?",
      answer:
        "We encourage bringing cameras for the stunning scenery. We recommend a secure bag or strap to protect your equipment during the ride.",
    },
    {
      question: "How many people are in a typical group?",
      answer:
        "We keep groups small for a more personalized experience, typically 6-10 people maximum. This ensures better attention from guides and a more intimate experience.",
    },
  ],
}

export function ActivityFAQ({ activityId }: ActivityFAQProps) {
  const faqs = faqData[activityId as keyof typeof faqData] || faqData["sunset-quad-adventure"]

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h3>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
