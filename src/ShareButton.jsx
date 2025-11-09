import React from "react";
import html2canvas from "html2canvas";

const ShareButton = ({ containerId }) => {
  const handleShare = async () => {
    const container = document.getElementById(containerId);
    if (!container) return alert("Container not found!");

    try {
      const canvas = await html2canvas(container, { useCORS: true, scale: 2 });
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      const file = new File([blob], "split-details.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My Split Details",
          text: "Here are my bill split results!",
        });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "split-details.png";
        link.click();
        alert("Sharing not supported. Image downloaded instead.");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      alert("Failed to share the image.");
    }
  };

  return (
    <button onClick={handleShare} style={{ cursor: "pointer" }}>
      Share
    </button>
  );
};

export default ShareButton;
