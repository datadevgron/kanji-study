import React, { useRef, useState, useEffect } from 'react'

export default function WritingPractice({ kanji, onBack }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showGuide, setShowGuide] = useState(true)
  const [strokeCount, setStrokeCount] = useState(0)
  const [totalStrokes, setTotalStrokes] = useState(null)
  const [svgContent, setSvgContent] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [animationSpeed, setAnimationSpeed] = useState(1) // 0.5x, 1x, 2x

  // Fetch SVG from KanjiVG and stroke count from KanjiAPI
  useEffect(() => {
    async function fetchData() {
      const hex = kanji.codePointAt(0).toString(16).padStart(5, '0')
      
      // Fetch stroke count
      try {
        const res = await fetch(`https://kanjiapi.dev/v1/kanji/${encodeURIComponent(kanji)}`)
        if (res.ok) {
          const data = await res.json()
          setTotalStrokes(data.stroke_count || null)
        }
      } catch (err) {
        console.error('Failed to fetch stroke count:', err)
      }

      // Fetch SVG for animation
      try {
        const svgRes = await fetch(`https://kanjivg.tagaini.net/kanjivg/kanji/${hex}.svg`)
        if (svgRes.ok) {
          const svgText = await svgRes.text()
          setSvgContent(svgText)
        }
      } catch (err) {
        console.error('Failed to fetch SVG:', err)
      }
    }
    fetchData()
  }, [kanji])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 8
    ctx.strokeStyle = '#1f2937'
  }, [])

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      }
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    }
  }

  const startDrawing = (e) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)
    
    ctx.beginPath()
    ctx.moveTo(pos.x, pos.y)
    setIsDrawing(true)
  }

  const draw = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)
    
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  const stopDrawing = (e) => {
    if (isDrawing) {
      setStrokeCount(prev => prev + 1)
    }
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setStrokeCount(0)
  }

  // Process SVG to add animation styles
  const getAnimatedSvg = () => {
    if (!svgContent) return null
    
    // Find all stroke paths - KanjiVG uses id like "kvg:xxxxx-s1", "kvg:xxxxx-s2", etc.
    const strokePaths = svgContent.match(/<path[^>]*id="kvg:[^"]*-s(\d+)"[^>]*/g) || []
    const numStrokes = strokePaths.length || totalStrokes || 4
    
    // Animation timing based on speed
    const baseTime = 0.8 / animationSpeed // seconds per stroke
    const uniqueClass = `anim-${animationKey}`
    
    // Create CSS that targets paths by their stroke ID pattern
    // Use a large stroke-dasharray value and animate from hidden to visible
    const animationCss = `
      .${uniqueClass} path[id*="-s"] {
        fill: none !important;
        stroke: #1a1a1a !important;
        stroke-width: 4 !important;
        stroke-linecap: round !important;
        stroke-linejoin: round !important;
        stroke-dasharray: 500;
        stroke-dashoffset: 500;
      }
      ${Array.from({length: numStrokes}, (_, i) => `
        .${uniqueClass} path[id$="-s${i + 1}"] {
          animation: drawStroke-${animationKey} ${baseTime}s ease-out forwards;
          animation-delay: ${i * baseTime}s;
        }
      `).join('')}
      @keyframes drawStroke-${animationKey} {
        0% { stroke-dashoffset: 500; }
        100% { stroke-dashoffset: 0; }
      }
      /* Hide stroke number text */
      .${uniqueClass} text { display: none !important; }
      .${uniqueClass} g[id*="StrokeNumbers"] { display: none !important; }
      .${uniqueClass} g[id*="StrokePaths"] path { 
        stroke: #1a1a1a !important;
      }
    `
    
    // Clean up SVG
    let cleanedSvg = svgContent
      .replace(/<\?xml[^>]*\?>/g, '')
      .replace(/<!DOCTYPE[\s\S]*?]>/g, '')  // DOCTYPE with internal subset ends with ]>
      .replace(/<!DOCTYPE[^>]*>/g, '')       // DOCTYPE without internal subset
      .replace(/<!--[\s\S]*?-->/g, '')
      // Make SVG responsive
      .replace(/width="[^"]*"/, 'width="100%"')
      .replace(/height="[^"]*"/, 'height="100%"')
      // Ensure viewBox is set for proper scaling
      .replace(/<svg/, '<svg preserveAspectRatio="xMidYMid meet"')
    
    return `<style>${animationCss}</style><div class="${uniqueClass}" style="width:100%;height:100%">${cleanedSvg}</div>`
  }

  const playAnimation = () => {
    setIsAnimating(true)
    setAnimationKey(prev => prev + 1)
    // Reset after animation completes
    const baseTime = 0.8 / animationSpeed
    const duration = (totalStrokes || 4) * baseTime * 1000 + 500
    setTimeout(() => setIsAnimating(false), duration)
  }

  return (
    <div style={{ padding: 16 }}>
      {/* Stroke Order Reference */}
      <div style={{ 
        display: 'flex', 
        gap: 24, 
        marginBottom: 24,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {/* Animated stroke order */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          textAlign: 'center',
          minWidth: 220
        }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>
            Stroke Order Animation
          </div>
          <div style={{
            width: 200,
            height: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fafafa',
            borderRadius: 12,
            overflow: 'hidden',
            position: 'relative'
          }}>
            {svgContent ? (
              <div 
                key={animationKey}
                style={{ width: '100%', height: '100%', padding: 10 }}
                dangerouslySetInnerHTML={{ __html: getAnimatedSvg() }}
              />
            ) : (
              <div style={{ fontSize: 100 }}>{kanji}</div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn"
              onClick={playAnimation}
              disabled={!svgContent || isAnimating}
              style={{
                fontSize: 12,
                padding: '8px 16px',
                opacity: (!svgContent || isAnimating) ? 0.6 : 1
              }}
            >
              {isAnimating ? 'Playing...' : '▶ Play'}
            </button>
            {/* Speed controls */}
            <div style={{ display: 'flex', gap: 4 }}>
              {[0.5, 1, 2].map(speed => (
                <button
                  key={speed}
                  onClick={() => setAnimationSpeed(speed)}
                  disabled={isAnimating}
                  style={{
                    fontSize: 11,
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: 'none',
                    background: animationSpeed === speed ? '#0d9488' : '#e5e7eb',
                    color: animationSpeed === speed ? 'white' : '#6b7280',
                    cursor: isAnimating ? 'not-allowed' : 'pointer',
                    fontWeight: animationSpeed === speed ? 600 : 400,
                    opacity: isAnimating ? 0.6 : 1
                  }}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 8 }}>
            {totalStrokes ? `${totalStrokes} strokes` : 'Loading...'}
          </div>
        </div>

        {/* Practice canvas */}
        <div style={{
          background: 'white',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 13, color: '#6b7280', marginBottom: 12, fontWeight: 500 }}>
            Practice Writing
          </div>
          <div style={{ position: 'relative', background: '#fafafa', borderRadius: 12 }}>
            {/* Guide character behind canvas */}
            {showGuide && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 200,
                height: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 150,
                color: 'rgba(0,0,0,0.08)',
                pointerEvents: 'none',
                zIndex: 1
              }}>
                {kanji}
              </div>
            )}
            
            {/* Grid lines */}
            <svg 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 200,
                height: 200,
                pointerEvents: 'none',
                zIndex: 1
              }}
              viewBox="0 0 200 200"
            >
              {/* Diagonal lines */}
              <line x1="0" y1="0" x2="200" y2="200" stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="200" y1="0" x2="0" y2="200" stroke="rgba(0,0,0,0.06)" strokeWidth="1" strokeDasharray="4,4" />
              {/* Center cross */}
              <line x1="100" y1="0" x2="100" y2="200" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="0" y1="100" x2="200" y2="100" stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="4,4" />
            </svg>

            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              style={{
                background: 'transparent',
                borderRadius: 12,
                cursor: 'crosshair',
                touchAction: 'none',
                position: 'relative',
                zIndex: 2,
                border: '2px solid #e5e7eb'
              }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          
          <div style={{ 
            fontSize: 14, 
            color: strokeCount === totalStrokes ? '#10b981' : '#6b7280', 
            fontWeight: 600,
            marginTop: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8
          }}>
            <span>Strokes: {strokeCount}{totalStrokes ? `/${totalStrokes}` : ''}</span>
            {strokeCount === totalStrokes && totalStrokes && <span>✓</span>}
          </div>
          
          {/* Controls */}
          <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
            <button 
              className="btn secondary"
              onClick={clearCanvas}
              style={{ fontSize: 12, padding: '6px 12px' }}
            >
              Clear
            </button>
            <button 
              className="btn secondary"
              onClick={() => setShowGuide(!showGuide)}
              style={{ fontSize: 12, padding: '6px 12px' }}
            >
              {showGuide ? 'Hide' : 'Show'} Guide
            </button>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div style={{
        background: 'rgba(13,148,136,0.08)',
        borderRadius: 12,
        padding: 16,
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0d9488', marginBottom: 8 }}>
          ✏️ Writing Tips
        </div>
        <div style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>
          Watch the stroke order animation above, then practice writing in the canvas.<br/>
          Follow the stroke order carefully - it helps with memorization and recognition.
        </div>
      </div>

      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <button className="btn secondary" onClick={onBack}>
          ← Back to Study
        </button>
      </div>
    </div>
  )
}
