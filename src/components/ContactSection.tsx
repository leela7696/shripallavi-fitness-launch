import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    try {
      setSubmitting(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      // Fallback: if backend route is unavailable in the current host, use FormSubmit.
      if (res.status === 404 || res.status === 405) {
        const fsRes = await fetch("https://formsubmit.co/ajax/leelak919@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            _replyto: form.email,
            _subject: "New message from Shripallavi Fitness website",
            _template: "box",
            _captcha: "false",
          }),
        });
        if (!fsRes.ok) {
          const errData = await fsRes.json().catch(() => null);
          throw new Error(errData?.message || `Failed to send (${fsRes.status})`);
        }
      } else {
        const data = await res.json().catch(() => null);
        if (!res.ok) throw new Error(data?.error || `Failed to send (${res.status})`);
      }
      toast({ title: "Message Sent!", description: "We'll get back to you shortly." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Please try again later.";
      toast({ title: "Failed to send message", description: message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-card/50">
      <div className="container mx-auto px-4 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight">
            Get In <span className="text-primary">Touch</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-background border-border"
            />
            <Input
              placeholder="Your Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-background border-border"
            />
            <Input
              placeholder="Phone Number"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
              className="bg-background border-border"
            />
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="bg-background border-border"
            />
            <Button type="submit" size="lg" className="w-full text-base" disabled={submitting}>
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {/* Info */}
          <div className="space-y-6">
            <a href="tel:09888345345" className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors">
              <Phone size={22} className="text-primary shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Call Us</p>
                <p className="font-bold">098883 45345</p>
              </div>
            </a>
            <div className="flex items-start gap-4 p-4 rounded-lg bg-background border border-border">
              <MapPin size={22} className="text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Our Location</p>
                <p className="font-bold text-sm">Beside DRDL Residential Complex, Diamond Point, Icrisat Colony, Bowenpally, Secunderabad, Telangana 500009</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-background border border-border">
              <Clock size={22} className="text-primary shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground">Business Hours</p>
                <p className="font-bold">Open · Closes 8 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="max-w-5xl mx-auto rounded-lg overflow-hidden border border-border">
          <iframe
            title="Shripallavi Fitness and Gym Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.8!2d78.4867!3d17.4712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBowenpally%2C+Secunderabad!5e0!3m2!1sen!2sin!4v1600000000000"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
