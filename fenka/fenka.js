function main() {

    var v = new Vue({
        el: '#app',
        data: {
            canvasHeight: 600, canvasWidth: 120,
            rectHeight: 20, rectWidth: 120, shift: 0,
            rects: [], colorInputVal: '#000000', currentRect: null,
        },

        methods: {
            createRect: function() {
                var self = this;
                var rect = new fabric.Rect({
                    left: 0, top: this.shift, selectable: false,
                    width: this.rectWidth, height: this.rectHeight,
                    fill: '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6),
                });
                rect.on('mousedown', function() {
                    self.currentRect = this;
                    self.colorInput.value = this.fill;
                    self.colorInput.click();
                });
                return rect;
            },

            addRect: function() {
                var rect = this.createRect();
                this.canvas.add(rect);
                this.shift += this.rectHeight;
                this.rects.push(rect);
                return rect;
            },

            reload: function() {
                this.canvas.clear();
                this.shift = 0;
                this.generate();
            },
            
            generate: function() {
                for (i=0; i<this.canvasHeight / this.rectHeight; i++) {
                    this.addRect();
                }
            },
        },

        mounted: function() {
            var self = this;
            this.canvas = new fabric.Canvas('c');
            this.generate();

            this.colorInput = document.getElementById('color-input');
            this.colorInput.onchange = function() {
                self.currentRect.set('fill', self.colorInputVal);
                self.canvas.renderAll();
            } 
        }
    });
}
