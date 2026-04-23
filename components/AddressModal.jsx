"use client";

import React, { useState } from "react";
import {
  MapPin,
  Plus,
  Check,
  Trash2,
  Home,
  Building2,
  Briefcase,
} from "lucide-react";
import { useAddressStore } from "@/store/useAddressStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ADDRESS_TYPES = [
  { value: "home", label: "Home", icon: Home },
  { value: "work", label: "Work", icon: Briefcase },
  { value: "other", label: "Other", icon: Building2 },
];

// ─── Add Address Form ──────────────────────────────────────────────
function AddAddressForm({ onSave, onCancel }) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    type: "home",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Required";
    if (!form.phone.trim()) newErrors.phone = "Required";
    if (!form.street.trim()) newErrors.street = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.state.trim()) newErrors.state = "Required";
    if (!form.zipCode.trim()) newErrors.zipCode = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Address Type Selector */}
      <div className="flex gap-2">
        {ADDRESS_TYPES.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type="button"
            onClick={() => handleChange("type", value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${form.type === value
                ? "bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black dark:border-white"
                : "bg-transparent text-zinc-500 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
              }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="fullName" className="text-xs font-medium text-zinc-500 mb-1.5 block">
            Full Name *
          </Label>
          <Input
            id="fullName"
            placeholder="John Doe"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className={`h-11 rounded-xl ${errors.fullName ? "border-red-400 focus:ring-red-400" : ""}`}
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-xs font-medium text-zinc-500 mb-1.5 block">
            Phone *
          </Label>
          <Input
            id="phone"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className={`h-11 rounded-xl ${errors.phone ? "border-red-400 focus:ring-red-400" : ""}`}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="street" className="text-xs font-medium text-zinc-500 mb-1.5 block">
          Street Address *
        </Label>
        <Input
          id="street"
          placeholder="123 Main Street"
          value={form.street}
          onChange={(e) => handleChange("street", e.target.value)}
          className={`h-11 rounded-xl ${errors.street ? "border-red-400 focus:ring-red-400" : ""}`}
        />
      </div>

      <div>
        <Label htmlFor="apartment" className="text-xs font-medium text-zinc-500 mb-1.5 block">
          Apt / Suite / Floor (optional)
        </Label>
        <Input
          id="apartment"
          placeholder="Apt 4B"
          value={form.apartment}
          onChange={(e) => handleChange("apartment", e.target.value)}
          className="h-11 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <Label htmlFor="city" className="text-xs font-medium text-zinc-500 mb-1.5 block">
            City *
          </Label>
          <Input
            id="city"
            placeholder="Mumbai"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
            className={`h-11 rounded-xl ${errors.city ? "border-red-400 focus:ring-red-400" : ""}`}
          />
        </div>
        <div>
          <Label htmlFor="state" className="text-xs font-medium text-zinc-500 mb-1.5 block">
            State *
          </Label>
          <Input
            id="state"
            placeholder="MH"
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
            className={`h-11 rounded-xl ${errors.state ? "border-red-400 focus:ring-red-400" : ""}`}
          />
        </div>
        <div>
          <Label htmlFor="zipCode" className="text-xs font-medium text-zinc-500 mb-1.5 block">
            PIN Code *
          </Label>
          <Input
            id="zipCode"
            placeholder="400001"
            value={form.zipCode}
            onChange={(e) => handleChange("zipCode", e.target.value)}
            className={`h-11 rounded-xl ${errors.zipCode ? "border-red-400 focus:ring-red-400" : ""}`}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-12 rounded-full font-bold"
          >
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          className="flex-1 h-12 rounded-full font-bold"
        >
          Save Address
        </Button>
      </div>
    </form>
  );
}

// ─── Address Card ──────────────────────────────────────────────────
function AddressCard({ address, isSelected, onSelect, onDelete }) {
  const TypeIcon =
    ADDRESS_TYPES.find((t) => t.value === address.type)?.icon || MapPin;
  const typeLabel =
    ADDRESS_TYPES.find((t) => t.value === address.type)?.label || "Address";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(address.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(address.id);
        }
      }}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all relative group cursor-pointer ${isSelected
          ? "border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-900"
          : "border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600"
        }`}
    >
      {/* Selected indicator */}
      <div
        className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected
            ? "bg-zinc-900 dark:bg-white"
            : "border-2 border-zinc-200 dark:border-zinc-700"
          }`}
      >
        {isSelected && <Check size={14} className="text-white dark:text-black" />}
      </div>

      {/* Delete button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(address.id);
        }}
        className="absolute bottom-3 right-3 p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={14} />
      </button>

      <div className="flex items-start gap-3 pr-8">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isSelected
              ? "bg-zinc-900 dark:bg-white text-white dark:text-black"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
            }`}
        >
          <TypeIcon size={14} />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-sm">{address.fullName}</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
              {typeLabel}
            </span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            {address.street}
            {address.apartment && `, ${address.apartment}`}
            <br />
            {address.city}, {address.state} – {address.zipCode}
          </p>
          <p className="text-xs text-zinc-400 mt-1">{address.phone}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Address Modal ────────────────────────────────────────────
export default function AddressModal({ open, onOpenChange, onConfirm }) {
  const { addresses, selectedAddressId, addAddress, removeAddress, selectAddress } =
    useAddressStore();
  const [showAddForm, setShowAddForm] = useState(false);

  const hasAddresses = addresses.length > 0;

  // If no addresses, go straight to add form
  const isAddMode = showAddForm || !hasAddresses;

  const handleSaveAddress = (formData) => {
    const newAddr = addAddress(formData);
    selectAddress(newAddr.id);
    setShowAddForm(false);
  };

  const handleConfirm = () => {
    const selected = addresses.find((a) => a.id === selectedAddressId);
    if (selected) {
      onConfirm(selected);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <MapPin size={18} />
            {isAddMode ? "Add Delivery Address" : "Select Delivery Address"}
          </DialogTitle>
          <DialogDescription>
            {isAddMode
              ? "Enter your delivery address to continue with payment."
              : "Choose where you'd like your order delivered."}
          </DialogDescription>
        </DialogHeader>

        {isAddMode ? (
          <AddAddressForm
            onSave={handleSaveAddress}
            onCancel={hasAddresses ? () => setShowAddForm(false) : undefined}
          />
        ) : (
          <div className="space-y-4">
            {/* Address List */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  isSelected={selectedAddressId === addr.id}
                  onSelect={selectAddress}
                  onDelete={removeAddress}
                />
              ))}
            </div>

            {/* Add New Button */}
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-2xl text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-500 transition-all"
            >
              <Plus size={16} />
              Add New Address
            </button>

            {/* Deliver Here Button */}
            <Button
              onClick={handleConfirm}
              disabled={!selectedAddressId}
              className="w-full h-12 rounded-full font-bold"
            >
              Deliver to this Address
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
