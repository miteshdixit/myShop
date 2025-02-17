import React from "react";
import { cn } from "@/lib/utils"; // Assuming cn is defined in utils.js

const Button = React.forwardRef(
  ({ className, variant = "normal", ...props }, ref) => {
    // Define button variants
    const variants = {
      normal: "bg-blue-500 text-white hover:bg-blue-600", // Normal button
      success: "bg-green-500 text-white hover:bg-green-600", // Success button
      error: "bg-red-500 text-white hover:bg-red-600", // Error button
    };

    // Get the corresponding class for the variant
    const variantClasses = variants[variant] || variants.normal;

    return (
      <button
        className={cn(
          "px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2", // Common classes for all buttons
          variantClasses, // Variant-specific classes
          className // Any additional custom classes
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
export { Button };
