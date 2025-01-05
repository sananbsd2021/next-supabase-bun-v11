"use client";
import { useEffect, useState } from "react";
import ContactForm from "./ContactForm";

export interface ContactsItem {
  id: number;
  title: string;
  description: string;
  email?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactsPage() {
  const [contactsItems, setContactsItems] = useState<ContactsItem[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch contacts function
  async function fetchContacts() {
    try {
      const response = await fetch("/api/contacts");
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const result = await response.json();
      if (result.success) {
        setContactsItems(result.data);
      } else {
        setError("Failed to load contacts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle adding new contact with optional description
  const handleAddContact = async (data: {
    title: string;
    description?: string; // Make description optional here
  }) => {
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }

      const newContact = await response.json();
      setContactsItems((prev) => [newContact.data, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
        <button
          onClick={() => {
            setError(null);
            setLoading(true);
            fetchContacts(); // Call fetchContacts directly here
          }}
          className="ml-4 bg-blue-500 text-white px-3 py-1 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>

      {/* Add Contact Button */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Contact
      </button>

      {/* Contact Form */}
      {showForm && (
        <ContactForm
          onSubmit={handleAddContact}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Contact Cards */}
      {contactsItems.length === 0 ? (
        <div className="text-center text-gray-500">No contacts found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contactsItems.map((item, index) => (
            <div
              key={item.id || `item-${index}`} // Use item.id or fallback to index
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="text-gray-600">
                  {item.description ? (
                    item.description.length > 100 ? (
                      <>
                        {item.description.slice(0, 100)}...
                        <a
                          href={`/contacts/${item.id}`}
                          className="text-blue-500 hover:underline ml-1"
                        >
                          Read More
                        </a>
                      </>
                    ) : (
                      item.description
                    )
                  ) : (
                    <span className="text-gray-400">
                      No description available
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Added on: {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
