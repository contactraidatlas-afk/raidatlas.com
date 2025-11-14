import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface ActivityReviewsProps {
  activityId: string
}

const sampleReviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Absolutely incredible experience! The sunset views were breathtaking and our guide Mohammed was fantastic. The quad bikes were in excellent condition and the tea ceremony was a lovely touch.",
    country: "United Kingdom",
  },
  {
    name: "Marco Rodriguez",
    rating: 5,
    date: "1 month ago",
    comment:
      "Best activity we did in Morocco! Professional service, amazing landscapes, and great value for money. Highly recommend for anyone visiting the area.",
    country: "Spain",
  },
  {
    name: "Emma Thompson",
    rating: 4,
    date: "3 weeks ago",
    comment:
      "Really enjoyed the adventure. The desert scenery is stunning and the guides are knowledgeable. Only minor issue was the pickup was slightly delayed, but overall excellent experience.",
    country: "Australia",
  },
  {
    name: "Ahmed Hassan",
    rating: 5,
    date: "1 week ago",
    comment:
      "Perfect organization from start to finish. The equipment was top quality and safety was clearly a priority. The traditional tea break was a wonderful cultural touch.",
    country: "Canada",
  },
]

export function ActivityReviews({ activityId }: ActivityReviewsProps) {
  return (
    <section>
      <h3 className="text-2xl font-semibold mb-6">Guest Reviews</h3>
      <div className="space-y-6">
        {sampleReviews.map((review, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {review.country} • {review.date}
                  </p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
