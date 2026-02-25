"use client";

import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/app/components/ui/dialog";
import Input from "@/app/components/ui/input";
import { Plus, Loader2, Edit } from "lucide-react";
import axios from "axios";

const UPLOADS_BASE_URL =
  process.env.NEXT_PUBLIC_UPLOADS_BASE_URL || "https://www.bfis.in/api/uploads";

export default function AdminNewsCoveragePage() {
  const [newsCoverages, setNewsCoverages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({ name: "", date: "" });

  const [featureImageFile, setFeatureImageFile] = useState(null);
  const [featureImagePreview, setFeatureImagePreview] = useState("");

  const [galleryFiles, setGalleryFiles] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [error, setError] = useState("");

  const featureFileInputRef = useRef(null);
  const galleryFileInputRef = useRef(null);

  useEffect(() => {
    fetchNewsCoverages();
  }, []);

  const fetchNewsCoverages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/news-coverage", {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch news coverages");
      const data = await response.json();

      // Support either { newsCoverages: [] } OR [] response shapes
      const list = Array.isArray(data?.newsCoverages)
        ? data.newsCoverages
        : Array.isArray(data)
        ? data
        : [];

      const sorted = list
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      setNewsCoverages(sorted);
    } catch (err) {
      setError("Failed to load news coverages");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ name: "", date: "" });
    setFeatureImageFile(null);
    setFeatureImagePreview("");
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setError("");
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      name: item.name || "",
      date: item.date ? item.date.slice(0, 10) : "",
    });

    setFeatureImageFile(null);
    setFeatureImagePreview(
      item.thumbnail ? `${UPLOADS_BASE_URL}/${item.thumbnail}` : ""
    );

    // IMPORTANT: show existing gallery images while editing
    const existing = Array.isArray(item.images) ? item.images : [];
    setGalleryFiles([]); // user hasn't selected new files yet
    setGalleryPreviews(existing.map((img) => `${UPLOADS_BASE_URL}/${img}`));

    setError("");
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({ name: "", date: "" });
    setFeatureImageFile(null);
    setFeatureImagePreview("");
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setError("");
  };

  const handleFeatureImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setFeatureImageFile(null);
      // keep existing preview if editing
      if (!editingId) setFeatureImagePreview("");
      return;
    }
    setFeatureImageFile(file);
    setFeatureImagePreview(URL.createObjectURL(file));
  };

  const handleGalleryFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    setGalleryFiles(files);
    setGalleryPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.date) {
      setError("Please fill in name and date");
      return;
    }

    // For create, feature image is mandatory
    if (!editingId && !featureImageFile) {
      setError("Please select a thumbnail image");
      return;
    }

    try {
      const form = new FormData();
      form.append("title", formData.name);
      form.append("date", formData.date);

      // Only send feature_image if user picked a new one (edit)
      if (featureImageFile) {
        form.append("feature_image", featureImageFile);
      }

      galleryFiles.forEach((file) => {
        form.append("news_coverage_images", file);
      });

      if (editingId) {
        await axios.patch(`/api/admin/news-coverage/${editingId}`, form);
      } else {
        await axios.post("/api/admin/news-coverage", form);
      }

      handleCloseDialog();
      fetchNewsCoverages();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save news coverage");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this news coverage item?"))
      return;

    try {
      setError("");
      await axios.delete(`/api/admin/news-coverage?id=${id}`);
      fetchNewsCoverages();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete news coverage");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-xl border bg-white/80">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-nblue" />
          <p className="text-sm text-gray-600">Loading news coverage…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-nblue">
            News Coverage Management
          </h1>
          <p className="text-sm text-gray-600">
            Upload media coverage items that appear on the public news coverage
            page.
          </p>
        </div>
        <Button onClick={handleOpenCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          Add News Coverage
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Card className="border-0 bg-white/80 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-gray-800">
            Existing news coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          {newsCoverages.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-500">
              No news coverage items yet. Click “Add News Coverage” to create
              one.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newsCoverages.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-xl border bg-white/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                    <img
                      src={`${UPLOADS_BASE_URL}/${item.thumbnail}`}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-sm font-semibold text-gray-900 line-clamp-2">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {item.images?.length || 0} images
                      </span>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleOpenEdit(item)}
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edit News Coverage" : "Add New News Coverage"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      News Coverage Name *
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      placeholder="Enter news coverage name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date *
                    </label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium mb-1">
                    Thumbnail Image {editingId ? "(optional)" : "*"} (upload
                    from computer)
                  </label>

                  <div className="flex items-center gap-3">
                    <input
                      ref={featureFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFeatureImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => featureFileInputRef.current?.click()}
                    >
                      Choose thumbnail
                    </Button>
                    <span className="text-xs text-gray-500 truncate">
                      {featureImageFile?.name ||
                        (featureImagePreview
                          ? "Image selected"
                          : "No file chosen")}
                    </span>
                  </div>

                  {featureImagePreview && (
                    <img
                      src={featureImagePreview}
                      alt="Thumbnail preview"
                      className="mt-1 w-full h-32 object-cover rounded border"
                    />
                  )}

                  <p className="text-[11px] text-gray-400">
                    Recommended: landscape image, under 5MB.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Gallery Images (you can select multiple)
                </label>

                <div className="flex items-center gap-3">
                  <input
                    ref={galleryFileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryFilesChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => galleryFileInputRef.current?.click()}
                  >
                    Choose gallery images
                  </Button>
                  <span className="text-xs text-gray-500 truncate">
                    {galleryFiles.length > 0
                      ? `${galleryFiles.length} file(s) selected`
                      : "No files chosen"}
                  </span>
                </div>

                {galleryPreviews.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                    {galleryPreviews.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Gallery ${idx + 1}`}
                        className="h-24 w-full object-cover rounded border"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
