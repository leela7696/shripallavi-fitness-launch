import { Accessibility, Ear, Waves, CircleDot, ShowerHead, Baby, Smartphone, Heart, Bath } from "lucide-react";

const categories = [
  {
    title: "Accessibility",
    items: [
      { icon: Accessibility, label: "Wheelchair Accessible" },
      { icon: Ear, label: "Assistive Hearing Loop" },
    ],
  },
  {
    title: "Amenities",
    items: [
      { icon: Waves, label: "Swimming Pool" },
      { icon: CircleDot, label: "Tennis Court" },
      { icon: ShowerHead, label: "Shower Facility" },
      { icon: Baby, label: "Child Care" },
    ],
  },
  {
    title: "Payment & Inclusive",
    items: [
      { icon: Smartphone, label: "Google Pay Accepted" },
      { icon: Heart, label: "LGBTQ+ Friendly" },
      { icon: Bath, label: "Gender-Neutral Toilets" },
    ],
  },
];

const FacilitiesSection = () => (
  <section id="facilities" className="py-20 md:py-28">
    <div className="container mx-auto px-4 space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
          Facilities & <span className="text-primary">Amenities</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="space-y-6">
            <h3 className="text-lg font-bold uppercase tracking-wide text-primary text-center">{cat.title}</h3>
            <div className="space-y-4">
              {cat.items.map((item) => (
                <div key={item.label} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
                  <item.icon size={22} className="text-primary shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FacilitiesSection;
