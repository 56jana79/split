import React from "react";
import html2canvas from "html2canvas";
import { FaWhatsapp } from "react-icons/fa"; // for WhatsApp icon

const ShareButton = ({ containerId }) => {
  // ✅ Detect iOS device
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const handleShare = async () => {
    const container = document.getElementById(containerId);
    if (!container) {
      alert("Container not found!");
      return;
    }

    try {
      const canvas = await html2canvas(container, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#2d2d2d", // ensures visibility on screenshot
      });

      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      const file = new File([blob], "split-details.png", { type: "image/png" });

      // ✅ For non-iOS devices that support file sharing
      if (!isIOS && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: "My split details",
          text: "Here are my bill split results!",
        });
      } else if (isIOS) {
        // ⚙️ iOS: save image + open WhatsApp link
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "split-details.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // open WhatsApp text share link
        setTimeout(() => {
          window.open(
            "https://api.whatsapp.com/send?text=Check%20out%20my%20bill%20split%20details!%20(See%20image%20I%20just%20shared%20from%20my%20phone.)",
            "_blank"
          );
        }, 800);

        alert(
          "iOS doesn’t allow direct image sharing. The image is downloaded — you can share it on WhatsApp now!"
        );
      } else {
        // 💾 fallback for older browsers
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "split-details.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        alert("Sharing not supported — image downloaded instead.");
      }
    } catch (error) {
      console.error("Error sharing image:", error);
      alert("Failed to share the image.");
    }
  };

  return (
    <button
      onClick={handleShare}
      style={{
        cursor: "pointer",
        background: isIOS ? "#25D366" : "#8c2393ff",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        color: "#fff",
        fontWeight: "bold",
      }}
    >
      {isIOS ? (
        <>
          <FaWhatsapp size={18} /> Share on WhatsApp
        </>
      ) : (
        "Share"
      )}
    </button>
  );
};

export default ShareButton;
