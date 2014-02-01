
var MapView = function (data) {
    this.init(data);
}

MapView.prototype = {

    init: function (data) {
        this.el =   '<div class="map">' +
                        '<div class="">' +
                            '<img class="zoom-out" src="css/img/zoomOut.png" />' +
                        '</div>' +
                        '<div class="compass">' +
                            '<img src="css/img/compass.png" />' +
                        '</div>' +
                    '</div>'

        this.$el = $(this.el);

        this.setData(data);
        this.setup();

        this.defaultImageWidth = 30;
        this.defaultImageHeight = 30;
        this.playerImageWidth = 30;
        this.playerImageHeight = 30;

        this.controls = {};
        this.controls.tooltip = true;
        this.controls.lines = true;
        
        this.svg = d3.select(this.$el[0]).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .attr("class", "map");

        this.bg = this.svg.append('g').attr('class','bg');
        this.landscapes = this.svg.append('g').attr('class','landscapes');
        this.borders = this.svg.append('g').attr('class','borders');
        this.fg = this.svg.append('g').attr('class','fg');
        this.players = this.svg.append('g').attr('class','fg');
        this.guidingLines = this.svg.append('g').attr('class','guiding-lines');

        this.$svg = this.$el.find('svg');
        this.$svg.on('mousemove', this.onSVGMousemove);
        this.$svg.on('mouseout', this.onSVGMouseout);

        this.tooltip = new Tooltip('map-tooltip');
        this.tooltip.setContent('<div class="details"></div><div class="coord"></div>');
        this.tooltip.coordEl = this.tooltip.$el.find('.coord');
        this.tooltip.detailsEl = this.tooltip.$el.find('.details');
        this.$el.append(this.tooltip.$el);

        this.zoomLevel = 0;
        this.currentLevel = data;

        this.render();
    },

    setup: function () {
        this.setWidthAndHeight();
        this.setBindings();
        this.setListeners();
    },

    setBindings: function () {
        this.onSVGMousemove = _.bind(this.onSVGMousemove, this);
        this.onSVGMouseout = _.bind(this.onSVGMouseout, this);
        this.onResize = _.bind(this.onResize, this);
        this.onResize = _.debounce(this.onResize, 250);
        this.onImageMouseover = _.bind(this.onImageMouseover, this);
        this.onImageMouseout = _.bind(this.onImageMouseout, this);
    },

    setListeners: function () {
        $(window).on('resize', this.onResize);
        $('.controls input').on('change', this.onControlsChange)
        this.onClickZoom = _.bind(this.onClickZoom, this);
        this.$el.find('.zoom-out').on('click', this.onClickZoom);
    },

    setData: function (data) {
        this.data = data;
        this.data.bg = this.getDataOfPosition('bg');
        this.data.landscapes = this.getDataOfPosition('landscapes');
        this.data.borders = this.getDataOfPosition('borders');
        this.data.fg = this.getDataOfPosition('fg');
    },

    getDataOfPosition: function (position) {
        return _.chain(this.data)
            .map(function (point) {
                if(point.position == position){
                    return point;
                }
            })
            .compact()
            .value();
    },

    render: function (originX, originY) {
        var that = this;
        this.setScales();
        
        this.originX = originX;
        this.originY = originY;

        this.renderPaths(this.bg, this.data.bg);
        this.renderPaths(this.landscapes, this.data.landscapes);
        this.renderPaths(this.borders, this.data.borders);
        this.renderPlayers(this.players, this.data.players);
        this.renderImages(this.fg, this.data.fg);
    },

    renderPaths: function (gHandle, data) {
        var that = this;
        // Render Paths
        var lineFn = d3.svg.line()
            .x(function (d) { 
                return that.xScale(d.x) 
            })
            .y(function (d) { 
                return that.yScale(d.z) 
            });

        var paths = gHandle.selectAll("path")
            .data(data)

        paths.enter().append('path')
            .style('opacity', 0)
            .attr('class', function (d) { return (d.class ? d.class : '') })
            .attr('d', function (d) { 
                return lineFn(d.edges);
            });

        paths.transition().duration(2000)
            .style('opacity', 1)
            .attr('class', function (d) { return (d.class ? d.class : '') })
            .attr('d', function (d) { 
                return lineFn(d.edges);
            });

        paths.exit().transition()
            .style('opacity',0)
            .remove();
    },

    renderImages: function (gHandle, data) {
        var that = this;
        // Images
        var images = gHandle.selectAll("image")
            .data(data, function (d) { return d.name })

        images.enter().append('image')
            .attr('x', function (d) {
                return that.originX ? that.originX : 0;
            })
            .attr('y', function (d) {
                return that.originY ? that.originY : 0;
            })

        images.transition()
            .attr('x', function (d) { 
                var width = (d.width ? d.width : that.defaultImageWidth);
                return that.xScale(d.overworldCoordinates.x) - (width / 2);
            })
            .attr('y', function (d) { 
                var height = (d.height ? d.height : that.defaultImageHeight);
                return that.yScale(d.overworldCoordinates.z) - (height / 2);
            })
            .attr('width', function (d) { return (d.width ? d.width : that.defaultImageWidth) })
            .attr('height', function (d) { return (d.height ? d.height : that.defaultImageHeight) })
            .attr('xlink:href', this.setImage)
            .each(function (d) {
                $(this).off('mouseover');
                $(this).off('mouseout');
                $(this).off('click');
                $(this).on('click', function (evt) {
                    if(d.submap){
                        that.zoomLevel++;
                        var parent = that.currentLevel;
                        that.currentLevel = d.submap;
                        that.currentLevel.parent = parent;
                        that.setData(that.currentLevel);
                        that.render(evt.clientX, evt.clientY);    
                    }
                });
                $(this).on('mouseover', function (evt) {
                    that.onImageMouseover(evt, d);
                });
                $(this).on('mouseout', function () {
                    that.onImageMouseout(d);
                })
            });
            
        images.exit().transition()
            .style('opacity', 0)
            .remove();
    },

    renderPlayers: function (gHandle, data) {
        if(!data){
            return;
        }
        var that = this;
        // Images
        var images = gHandle.selectAll("image")
            .data(data, function (d) { return d.name })

        images.enter().append('image')
            .attr('x', function (d) {
                return that.originX ? that.originX : 0;
            })
            .attr('y', function (d) {
                return that.originY ? that.originY : 0;
            })

        images.transition()
            .attr('x', function (d) { 
                return that.xScale(d.overworldCoordinates.x) - (that.playerImageWidth / 2);
            })
            .attr('y', function (d) { 
                return that.yScale(d.overworldCoordinates.z) - (that.playerImageHeight / 2);
            })
            .attr('width', that.playerImageWidth)
            .attr('height', that.playerImageHeight)
            .attr('xlink:href', this.setImage)
            .each(function (d) {
                $(this).off('mouseover');
                $(this).off('mouseout');
                $(this).on('mouseover', function (evt) {
                    that.onImageMouseover(evt, d);
                });
                $(this).on('mouseout', function () {
                    that.onImageMouseout(d);
                })
            });
            
        images.exit().transition()
            .style('opacity', 0)
            .remove();
    },

    zoomOut: function () {
        if(this.zoomLevel != 0){
            this.currentLevel = this.currentLevel.parent;
            this.setData(this.currentLevel);  
            this.render();
            this.zoomLevel--;
        }
    },

    updatePlayers: function (data) {
        this.data.players = data;
        this.render();
    },

    renderGuidingLines: function (clientX, clientY) {
        var data = [];
        data.push({
            name: 'guidingLine1',
            edges: [
                {x: clientX, y: 0},
                {x: clientX, y: clientY - 7},
                {x: clientX + 7, y: clientY - 7},
                {x: clientX + 7, y: clientY},
                {x: this.width, y: clientY}
            ]
        });
        data.push({
            name: 'guidingLine2',
            edges: [
                {x: 0, y: clientY},
                {x: clientX - 7, y: clientY},
                {x: clientX - 7, y: clientY + 7},
                {x: clientX, y: clientY + 7},
                {x: clientX, y: this.height}
            ]
        });

        var lineFn = d3.svg.line()
            .x(function (d) { 
                return d.x
            })
            .y(function (d) { 
                return d.y 
            });

        var lines = this.guidingLines.selectAll("path")
            .data(data)

        lines.enter().append('path')
            .attr('d', function (d) { 
                return lineFn(d.edges);
            });

        lines
            .attr('d', function (d) { 
                return lineFn(d.edges);
            });
    },

    setImage: function (d) {
        if(d.src){
            return d.src;
        } else {
            return 'css/img/' + d.img + '.png';    
        }
    },

    setScales: function () {
        var data = this.data;
        if(this.zoomLevel == 0){
            // Incorporate Players into the scale calculations
            data = _.chain()
                        .union(this.data, this.data.players)
                        .compact()
                        .value();
        }


        var overworldPoints = _.chain(data)
            .map(function (point) {
                if(point.edges){
                    return point.edges;
                } else {
                    return {
                        x: point.overworldCoordinates.x,
                        z: point.overworldCoordinates.z
                    }
                }    
            })
            .flatten()
            .value();

        var minX = _.min(overworldPoints, function (point) { return point.x; }).x;
        var maxX = _.max(overworldPoints, function (point) { return point.x; }).x;

        var range = maxX - minX;
        var padding = .1 * range;
        minX -= padding;
        maxX += padding;

        var minY = _.min(overworldPoints, function (point) { return point.z; }).z;
        var maxY = _.max(overworldPoints, function (point) { return point.z; }).z;

        range = maxY - minY;
        padding = .1 * range;
        minY -= padding;
        maxY += padding;

        this.xScale = d3.scale.linear()
            .range([this.width, 0])
            .domain([maxX, minX])

        this.yScale = d3.scale.linear()
            .range([this.height, 0])
            .domain([maxY, minY])
    },

    onSVGMousemove: function (evt) {
        if(!this.controls.tooltip){
            return;
        }
        this.tooltip.show();
        var coord = 'X: ' + parseInt(this.xScale.invert(evt.clientX)) + ' Z: ' + parseInt(this.yScale.invert(evt.clientY));
        
        this.tooltip.coordEl.text(coord);
        this.tooltip.$el.css({
            top:evt.clientY - 30,
            left: evt.clientX + 10
        });
        this.renderGuidingLines(evt.clientX, evt.clientY);
    },

    setWidthAndHeight: function () {
        var height = $(window).height();
        var width = $(window).width();
        this.width = width - 350;
        this.height = height - 200;
        this.$el.width(this.width);
        this.$el.height(this.height);
    },

    onSVGMouseout: function (evt) {
        this.tooltip.hide();
        $('svg .guiding-lines').empty();
    },

    onResize: function () {
        this.setWidthAndHeight();
        this.svg
            .attr("width", this.width)
            .attr("height", this.height)
        this.render();
    },

    onImageMouseout: function (d) {
        if(!this.controls.tooltip){
            return;
        }
        this.tooltip.detailsEl.text('');
    },

    onImageMouseover: function (evt, d) {
        if(!this.controls.tooltip){
            return;
        }
        this.tooltip.detailsEl.text(d.name)
    },

    onClickZoom: function () {
        this.zoomOut();
    }

}












