import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Image } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/use-toast';
import { MediaItem, addMediaItem, getMediaItems, updateMediaItem, deleteMediaItem } from '../../lib/mediaGalleryFirebase';

const MediaGalleryCMS = () => {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
    const [formData, setFormData] = useState({
        type: 'image' as 'image',
        url: '',
        title: '',
        description: ''
    });
    const { toast } = useToast();

    useEffect(() => {
        const unsubscribe = getMediaItems(
            (items) => {
                setMediaItems(items);
                setLoading(false);
            },
            (error) => {
                toast({
                    title: "Error",
                    description: error,
                    variant: "destructive"
                });
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, [toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.url.trim()) {
            toast({
                title: "Error",
                description: "URL is required",
                variant: "destructive"
            });
            return;
        }

        try {
            if (editingItem) {
                await updateMediaItem(editingItem.id, formData);
                toast({
                    title: "Success",
                    description: "Media item updated successfully"
                });
            } else {
                await addMediaItem(formData);
                toast({
                    title: "Success",
                    description: "Media item added successfully"
                });
            }

            resetForm();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to save media item",
                variant: "destructive"
            });
        }
    };

    const handleEdit = (item: MediaItem) => {
        setEditingItem(item);
        setFormData({
            type: item.type,
            url: item.url,
            title: item.title || '',
            description: item.description || ''
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this media item?')) {
            try {
                await deleteMediaItem(id);
                toast({
                    title: "Success",
                    description: "Media item deleted successfully"
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to delete media item",
                    variant: "destructive"
                });
            }
        }
    };

    const resetForm = () => {
        setFormData({
            type: 'image',
            url: '',
            title: '',
            description: ''
        });
        setEditingItem(null);
        setShowAddForm(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Media Gallery CMS</h1>
                <Button onClick={() => setShowAddForm(true)} className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Image
                </Button>
            </div>

            {showAddForm && (
                <Card>
                    <CardHeader>
                        <CardTitle>{editingItem ? 'Edit Image' : 'Add New Image'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">


                            <div>
                                <Label htmlFor="url">URL *</Label>
                                <Input
                                    id="url"
                                    type="url"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    required
                                />
                            </div>

                            <div>
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Optional title"
                                />
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Optional description"
                                    rows={3}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit">
                                    {editingItem ? 'Update' : 'Add'} Media
                                </Button>
                                <Button type="button" variant="outline" onClick={resetForm}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mediaItems.map((item) => (
                    <MediaItemCard
                        key={item.id}
                        item={item}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {mediaItems.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Image className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No Media Items</h3>
                    <p className="text-muted-foreground mb-4">Start by adding your first media item to the gallery.</p>
                    <Button onClick={() => setShowAddForm(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Media Item
                    </Button>
                </div>
            )}
        </div>
    );
};

interface MediaItemCardProps {
    item: MediaItem;
    onEdit: (item: MediaItem) => void;
    onDelete: (id: string) => void;
}

const MediaItemCard = ({ item, onEdit, onDelete }: MediaItemCardProps) => {

    return (
        <Card className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
                <img
                    src={item.url}
                    alt={item.title || 'Image'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/400x300/f3f4f6/9ca3af?text=Image+Not+Found';
                    }}
                />

                <div className="absolute top-2 left-2">
                    <Badge variant="default">
                        <Image className="w-3 h-3 mr-1" />
                        Image
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4">
                {item.title && (
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">{item.title}</h3>
                )}
                {item.description && (
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                )}

                <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                        {item.createdAt.toLocaleDateString()}
                    </span>
                    <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => onEdit(item)}>
                            <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => onDelete(item.id)}>
                            <Trash2 className="w-3 h-3" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MediaGalleryCMS;