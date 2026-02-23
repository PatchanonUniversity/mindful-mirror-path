import { useState } from "react";
import { generateImage } from "../config/imgen";

export default function App() {
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const base64 = await generateImage(
      "a calm daisy flower, soft pastel colors, peaceful mood",
    );
    setImg(`data:image/png;base64,${base64}`);
    setLoading(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Vite Image Generator</h2>

      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {img && (
        <div style={{ marginTop: 20 }}>
          <img src={img} width={400} />
        </div>
      )}
    </div>
  );
}
