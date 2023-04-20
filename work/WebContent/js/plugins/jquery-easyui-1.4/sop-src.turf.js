/**
 * @preserve Licensed under MIT License
 */
(function(factory) {
    // Packaging/modules magic dance
    var sop;
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['leaflet'], factory);
    } else if (typeof module !== 'undefined') {
        // Node/CommonJS
        L = require('leaflet');
        module.exports = factory(sop);
    } else {
        // Browser globals
        if (typeof window.sop === 'undefined') {
            throw new Error('Leaflet must be loaded first');
        }
        factory(window.sop);
    }
})(function(sop) {
    'use strict';

    /**
     * @const
     * @type {Number}
     */
    sop.Circle.SECTIONS_COUNT = 64;

    /**
     * Static
     * @param  {sop.Circle} circle
     * @param  {Number?}  vertices
     * @param  {sop.Map?}   map
     * @return {Array.<sop.LatLng>}
     */
    sop.Circle.toPolygon = function(circle, vertices, map) {
        map = map || circle._map;
        if (!map) {
            throw Error("Can't figure out points without adding the feature to the map");
        }

        var points = [],
            crs = map.options.crs,
            DOUBLE_PI = Math.PI * 2,
            angle = 0.0,
            projectedCentroid, radius,
            point, project, unproject;

        if (crs === sop.CRS.EPSG3857) {
            project = map.latLngToLayerPoint.bind(map);
            unproject = map.layerPointToLatLng.bind(map);
            radius = circle._radius;
        } else { // especially if we are using Proj4Leaflet
            project = crs.projection.project.bind(crs.projection);
            unproject = crs.projection.unproject.bind(crs.projection);
            radius = circle._mRadius;
        }

        projectedCentroid = project(circle._utmk)

        vertices = vertices || sop.Circle.SECTIONS_COUNT;

        for (var i = 0; i < vertices - 1; i++) {
            angle -= (DOUBLE_PI / vertices); // clockwise
            point = new sop.Point(
                projectedCentroid.x + (radius * Math.cos(angle)),
                projectedCentroid.y + (radius * Math.sin(angle))
            );
            if (i > 0 && point.equals(points[i - 1])) {
                continue;
            }
            points.push(unproject(point));
        }

        return points;
    };

    /**
     * As a method
     * @param  {Number?} vertices
     * @param  {sop.Map?}  map
     * @return {Array.<sop.LatLng>}
     */
    sop.Circle.prototype.toPolygon = function(vertices, map) {
        return sop.Circle.toPolygon(this, vertices, map || this._map);
    };

});