import React, { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const sendEmail = async (
    firstName: string,
    lastName: string,
    email: string,
    company: string,
    message: string
  ): Promise<void> => {
    // Mailtrap API configuration
    const REGULATORY_TOOL_MAIL_TOKEN = process.env.LANDING_PAGE_MAIL_TOKEN;

    const emailData = {
      email: email,
      html_content: `
         <h2>New Contact Form Submission</h2>
         <p><strong>From:</strong> ${firstName} ${lastName}</p>
         <p><strong>Email:</strong> ${email}</p>
         ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
         <p><strong>Message:</strong></p>
         <p>${message.replace(/\n/g, "<br>")}</p>
         <hr>
         <p><em>This message was sent via the Quantifier contact form.</em></p>
       `,
      text_content: `
         New Contact Form Submission
         
         From: ${firstName} ${lastName}
         Email: ${email}
         ${company ? `Company: ${company}` : ""}
         
         Message:
         ${message}
         
         ---
         This message was sent via the Quantifier contact form.
       `,
    };

    const response = await fetch(
      "http://localhost:8000/api/landing-page/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${REGULATORY_TOOL_MAIL_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message ||
          `Failed to send email: ${response.status} ${response.statusText}`
      );
    }

    // Optional: Log successful response for debugging
    const result = await response.json();
    console.log("Email sent successfully:", result);
  };

  const handleSubmit = async () => {
    // Basic validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      toast({
        title: "Missing Information",
        description:
          "Please fill in all required fields (First Name, Last Name, Email, and Message).",
        variant: "destructive",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await sendEmail(firstName, lastName, email, company, message);

      // Reset form after successful submission
      setFirstName("");
      setLastName("");
      setEmail("");
      setCompany("");
      setMessage("");

      toast({
        title: "Message Sent Successfully!",
        description:
          "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Failed to Send Message",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTemplate
      title="Contact Us"
      description="Get in touch with our team to learn more about our AI-powered compliance solutions."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="font-bold mb-6 gradient-heading text-6xl py-[20px]">
            Contact us
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Quantifier is redefining how companies approach compliance — with an
            always-on, autonomous AI platform that monitors, enforces, and
            drives real enterprise transformation.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                <p className="text-slate-600">contact@quantifier.ai</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Call Us</h3>
                <p className="text-slate-600">
                  USA: (+1) 415-799-8206
                  <br />
                  Europe: (+48) 698 759 206
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-compliance-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">
                  Visit Our Offices
                </h3>
                <p className="text-slate-600">
                  USA: 447 Sutter St Ste 405 PMB 137, San Francisco, CA 94108
                  <br />
                  Europe:
                  <br />
                  Warsaw: Rondo Daszynskiego 1, Warsaw
                  <br />
                  Lublin: Głowackiego 3/5/1
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/company/quantifier-ai/about/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-compliance-700 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:contact@quantifier.ai"
              className="text-slate-500 hover:text-compliance-700 transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div>
          <Card className="p-6 border border-slate-200">
            <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-slate-700"
                  >
                    First Name *
                  </label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-slate-700"
                  >
                    Last Name *
                  </label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm font-medium text-slate-700"
                >
                  Company Name
                </label>
                <Input
                  id="company"
                  placeholder="Acme Inc."
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-700"
                >
                  Message *
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="text-xs text-slate-500 mb-4">
                You can unsubscribe from these communications at any time. For
                more information on how to unsubscribe, our privacy practices,
                and how we are committed to protecting and respecting your
                privacy, please review our Privacy Policy. By clicking "send"
                above, you consent to allow Quantifier.ai to store and process
                the personal information submitted above to provide you the
                content requested.
              </div>

              <Button
                className="w-full group"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Contact;
