
import React, { useState } from 'react';
import type { Testimonial } from '../types';
import { Icon } from './Icon';

interface TestimonialEditorProps {
  initialTestimonials: Testimonial[];
  onSave: (testimonials: Testimonial[]) => void;
  onCancel: () => void;
}

const emptyTestimonial: Omit<Testimonial, 'id'> = {
  name: '',
  location: '',
  text: '',
  avatarUrl: '',
};

export const TestimonialEditor: React.FC<TestimonialEditorProps> = ({ initialTestimonials, onSave, onCancel }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | Omit<Testimonial, 'id'> | null>(null);

  const handleAddNew = () => {
    setEditingTestimonial(emptyTestimonial);
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
        setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingTestimonial(null);
  };

  const handleSaveTestimonial = (testimonialToSave: Testimonial | Omit<Testimonial, 'id'>) => {
    if ('id' in testimonialToSave) {
      // Editing existing
      setTestimonials(prev => prev.map(t => t.id === testimonialToSave.id ? testimonialToSave : t));
    } else {
      // Adding new
      const newTestimonial: Testimonial = { ...testimonialToSave, id: `testimonial-${Date.now()}` };
      setTestimonials(prev => [...prev, newTestimonial]);
    }
    setEditingTestimonial(null);
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="mb-6 pb-4 border-b">
            <h2 className="text-3xl font-bold text-gray-800">Edit Testimonials</h2>
            <p className="text-gray-600 mt-1">Manage the customer testimonials displayed on your site.</p>
        </div>
        
        {!editingTestimonial && (
             <div className="flex justify-end mb-6">
                <button
                    onClick={handleAddNew}
                    className="bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-cyan-700 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
                >
                    <Icon name="plus" className="h-5 w-5" />
                    <span>Add New Testimonial</span>
                </button>
            </div>
        )}
       
        {editingTestimonial ? (
            <TestimonialForm
                key={'id' in editingTestimonial ? editingTestimonial.id : 'new'}
                initialData={editingTestimonial}
                onSave={handleSaveTestimonial}
                onCancel={handleCancelEdit}
            />
        ) : (
             <div className="space-y-4">
                {testimonials.map(t => (
                    <div key={t.id} className="bg-gray-50 p-4 rounded-lg flex flex-col sm:flex-row items-start gap-4">
                        <img src={t.avatarUrl} alt={t.name} className="h-16 w-16 rounded-full object-cover border" />
                        <div className="flex-grow">
                            <h3 className="font-bold text-gray-800">{t.name} <span className="text-sm font-normal text-gray-500">- {t.location}</span></h3>
                            <p className="text-gray-600 mt-1 text-sm">{t.text}</p>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-3 self-start sm:self-center">
                            <button onClick={() => handleEdit(t)} className="text-cyan-600 hover:text-cyan-900 transition"><Icon name="edit" className="h-5 w-5"/></button>
                            <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:text-red-900 transition"><Icon name="trash" className="h-5 w-5"/></button>
                        </div>
                    </div>
                ))}
                 {testimonials.length === 0 && <p className="text-center text-gray-500 py-8">No testimonials yet. Add one to get started!</p>}
            </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-8 mt-4 border-t">
            <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                Cancel
            </button>
            <button type="button" onClick={() => onSave(testimonials)} className="bg-cyan-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors">
                Save All Changes
            </button>
        </div>
    </div>
  );
};

// Sub-component for the form
interface TestimonialFormProps {
    initialData: Testimonial | Omit<Testimonial, 'id'>;
    onSave: (testimonial: Testimonial | Omit<Testimonial, 'id'>) => void;
    onCancel: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            setFormData(prev => ({...prev, avatarUrl: dataUrl}));
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.avatarUrl) {
            alert("Please upload an avatar image.");
            return;
        }
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-50 p-4 rounded-lg border">
            <h3 className="text-lg font-semibold">{ 'id' in initialData ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700">Avatar Image</label>
                <div className="mt-2 flex items-center space-x-4">
                    <img
                        className="h-16 w-16 object-cover rounded-full bg-gray-200"
                        src={formData.avatarUrl || 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
                        alt="Avatar preview"
                    />
                    <label htmlFor="avatar-upload" className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        <span>Upload</span>
                        <input id="avatar-upload" name="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                    </label>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                    <input type="text" name="location" id="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"/>
                </div>
            </div>
            <div>
                <label htmlFor="text" className="block text-sm font-medium text-gray-700">Testimonial Text</label>
                <textarea name="text" id="text" value={formData.text} onChange={handleChange} rows={4} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"></textarea>
            </div>
             <div className="flex justify-end space-x-3">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
                <button type="submit" className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">Save Testimonial</button>
            </div>
        </form>
    );
};
