/**
 * Peros Esports - Ember & Fire Particle Engine
 * Ambient canvas background particle effects for high-energy gaming aesthetic.
 */

class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.maxParticles = 65;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.spawnParticle(true));
    }
  }

  spawnParticle(initial = false) {
    const colors = [
      'rgba(255, 85, 0, ',    // Fiery orange
      'rgba(255, 154, 0, ',   // Bright amber
      'rgba(255, 215, 0, ',   // Gold
      'rgba(255, 45, 85, ',   // Crimson flame
      'rgba(0, 240, 255, '    // Neon cyan ember spark
    ];

    return {
      x: Math.random() * this.width,
      y: initial ? Math.random() * this.height : this.height + 20,
      size: Math.random() * 3.5 + 1,
      speedY: Math.random() * 1.8 + 0.6,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.7 + 0.2,
      fadeSpeed: Math.random() * 0.006 + 0.002,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * 360,
      spin: (Math.random() - 0.5) * 2
    };
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.y -= p.speedY;
      p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
      p.opacity -= p.fadeSpeed;
      p.angle += p.spin;

      if (p.opacity <= 0 || p.y < -20 || p.x < -20 || p.x > this.width + 20) {
        this.particles[i] = this.spawnParticle(false);
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color}${Math.max(0, p.opacity)})`;
      this.ctx.shadowBlur = p.size * 3;
      this.ctx.shadowColor = p.color + '0.8)';
      this.ctx.fill();
      this.ctx.restore();
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// Auto instantiate when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new ParticleEngine('bg-canvas');
});
