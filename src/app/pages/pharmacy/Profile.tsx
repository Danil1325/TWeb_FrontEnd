import React, { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle,
  Edit3,
  Mail,
  MapPin,
  Phone,
  Save,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface PharmacyProfileData {
  name: string;
  email: string;
  pharmacyName: string;
  pharmacyLicense: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const defaultProfile: PharmacyProfileData = {
  name: "",
  email: "",
  pharmacyName: "",
  pharmacyLicense: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
};

function loadProfile(): PharmacyProfileData {
  try {
    const raw = localStorage.getItem("pharmacyProfile");
    if (raw) return { ...defaultProfile, ...JSON.parse(raw) };
  } catch {
    // ignore malformed data
  }
  return {
    ...defaultProfile,
    email: localStorage.getItem("userEmail") || "",
  };
}

interface FieldProps {
  label: string;
  value: string;
  name: keyof PharmacyProfileData;
  editing: boolean;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileField: React.FC<FieldProps> = ({ label, value, name, editing, type = "text", onChange }) => (
  <div>
    <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
    {editing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    ) : (
      <dd className="text-sm font-medium text-slate-900">{value || <span className="text-slate-400 italic">Not provided</span>}</dd>
    )}
  </div>
);

export const PharmacyProfile: React.FC = () => {
  const [profile, setProfile] = useState<PharmacyProfileData>(loadProfile);
  const [draft, setDraft] = useState<PharmacyProfileData>(profile);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const p = loadProfile();
    setProfile(p);
    setDraft(p);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("pharmacyProfile", JSON.stringify(draft));
    setProfile(draft);
    setEditing(false);
    toast.success("Profile saved successfully");
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const initials =
    profile.name
      ? profile.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : (profile.email.slice(0, 2).toUpperCase() || "PH");

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-6 text-white shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
              {initials}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{profile.name || "Pharmacy User"}</h2>
              <p className="text-sm text-white/80">{profile.pharmacyName || "—"}</p>
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium">
                <CheckCircle className="h-3 w-3" />
                Verified account
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-slate-100"
                >
                  <Save className="h-4 w-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/60 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-slate-100"
              >
                <Edit3 className="h-4 w-4" />
                Edit profile
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Personal Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
            <User className="h-4 w-4 text-indigo-500" />
            Personal Information
          </h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ProfileField label="Full Name" name="name" value={draft.name} editing={editing} onChange={handleChange} />
            <ProfileField label="Email Address" name="email" value={draft.email} editing={editing} type="email" onChange={handleChange} />
            <ProfileField label="Phone Number" name="phone" value={draft.phone} editing={editing} type="tel" onChange={handleChange} />
          </dl>
        </div>

        {/* Pharmacy Details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
            <Building2 className="h-4 w-4 text-indigo-500" />
            Pharmacy Details
          </h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ProfileField label="Pharmacy Name" name="pharmacyName" value={draft.pharmacyName} editing={editing} onChange={handleChange} />
            <ProfileField label="License Number" name="pharmacyLicense" value={draft.pharmacyLicense} editing={editing} onChange={handleChange} />
          </dl>
        </div>

        {/* Address */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
            <MapPin className="h-4 w-4 text-indigo-500" />
            Address
          </h3>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2">
              <ProfileField label="Street Address" name="address" value={draft.address} editing={editing} onChange={handleChange} />
            </div>
            <ProfileField label="City" name="city" value={draft.city} editing={editing} onChange={handleChange} />
            <ProfileField label="State" name="state" value={draft.state} editing={editing} onChange={handleChange} />
            <ProfileField label="ZIP Code" name="zipCode" value={draft.zipCode} editing={editing} onChange={handleChange} />
          </dl>
        </div>

        {/* Contact summary (read-only quick-view) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
          <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-slate-900">
            <Mail className="h-4 w-4 text-indigo-500" />
            Contact Summary
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm text-slate-700">
              <Mail className="h-4 w-4 text-indigo-400" />
              {profile.email || "—"}
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm text-slate-700">
              <Phone className="h-4 w-4 text-indigo-400" />
              {profile.phone || "—"}
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm text-slate-700">
              <MapPin className="h-4 w-4 text-indigo-400" />
              {[profile.address, profile.city, profile.state, profile.zipCode].filter(Boolean).join(", ") || "—"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
