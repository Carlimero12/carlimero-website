class Mindmap {
  constructor(containerId, numberOfSatellites = 6, radius = 200) {
    this.container = document.getElementById(containerId);
    this.centerButton = this.createButton('center', 'Map');
    this.satellites = [];
    this.expanded = false;
    this.radius = radius;
    this.numberOfSatellites = numberOfSatellites;

    this.centerX = this.container.offsetWidth / 2;
    this.centerY = this.container.offsetHeight / 2;

    this.centerButton.addEventListener('click', () => this.toggle());

    this.createSatellites();
  }

    createButton(type, label, index = null) {
        const btn = document.createElement('div');
        btn.classList.add('button', type);
        btn.textContent = label;
        if (type === 'satellite') {
        const angle = (2 * Math.PI * index) / this.numberOfSatellites;
        btn.dataset.angle = angle;
        btn.dataset.index = index;

        btn.style.left = `${this.centerX}px`;
        btn.style.top = `${this.centerY}px`;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.animatePulse(btn);
            this.handleSatelliteClick(index);
        });
    }

    this.container.appendChild(btn);
    return btn;
    }

    createSatellites() {
      const labels = ['Scores', 'Install', 'Info', ' ', ' ', ' '];

      for (let i = 0; i < this.numberOfSatellites; i++) {
        const btn = this.createButton('satellite', labels[i] || `#${i + 1}`, i);
        this.satellites.push(btn);
      }
    }


    animatePulse(element) {
        element.classList.add('pulse');
        setTimeout(() => element.classList.remove('pulse'), 300);
    }

    toggle() {
        this.animatePulse(this.centerButton);
        this.expanded = !this.expanded;
        this.animateSatellites();
    }

    animateSatellites() {
        this.satellites.forEach((btn) => {
            const angle = parseFloat(btn.dataset.angle);
            const x = this.centerX + Math.cos(angle) * this.radius;
            const y = this.centerY + Math.sin(angle) * this.radius;

            if (this.expanded) {
            btn.style.left = `${x}px`;
            btn.style.top = `${y}px`;
            btn.style.transform = `translate(-50%, -50%) scale(1.3)`;
            } else {
            btn.style.left = `${this.centerX}px`;
            btn.style.top = `${this.centerY}px`;
            btn.style.transform = `translate(-50%, -50%) scale(0)`;
            }
        });
    }

    handleSatelliteClick(index) {
      console.log(`Satellit #${index} wurde geklickt.`);
    
      if (index === 0) {
        /*alert("this is not finished");
        next();*/
        window.location.assign("/Highscores.html");
      } else if (index === 1) {
        window.location.assign("/Download.html");
      } else if (index === 2) {
        window.location.assign("/about.html");
      }
}

}

document.addEventListener('DOMContentLoaded', () => {
    new Mindmap('mindmap-container', 6, 130);
});
