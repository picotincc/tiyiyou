export default class RadarMap {
  constructor(props) {
    if (props && props.setting) {
      this.dimensionalityCount = props.setting.dimensionalityCount;
      this.dimensionalitySize = props.setting.dimensionalitySize;
      this.titles = props.setting.titles;
      this.selector = props.setting.selector;
      this._initRadarMap();
    } else {
      return null;
    }
  }

  _initRadarMap() {
    if ( this.dimensionalityCount < 1 || this.dimensionalitySize < 0 || this.titles < 1 || this.titles.length !== this.dimensionalityCount) {
      return false;
    }

    this.width = $(this.selector).width();
    this.height = $(this.selector).height();
    this.svg = d3.select(this.selector).append('svg')
                  .attr('width', this.width)
                  .attr('height', this.height)
                  .append('g')
                  .classed('radar-map', true)
                  .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const dimData = this._initDimensionalityData();
    this._drawDimensionality(dimData);
  }

  _initDimensionalityData() {
    const radarData = {
      webs: [],
      webPoints: [],
    };
    this.axisLength = Math.min(this.width, this.height) / 2;
    const onePiece = 2 * Math.PI / this.dimensionalityCount;
    for(let k = this.dimensionalitySize; k > 0; k--) {
      let webs = '';
      let webPoints = [];
      let r = this.axisLength / this.dimensionalitySize * k;
      for(let i = 0; i < this.dimensionalityCount; i++) {
          const x = r * Math.sin(i * onePiece);
          const y = r * Math.cos(i * onePiece);
          webs += x + ',' + y + ' ';
          webPoints.push({
              x: x,
              y: y
          });
      }
      radarData.webs.push(webs);
      radarData.webPoints.push(webPoints);
    }
    return radarData;
  }

  _drawDimensionality(data) {
    this.svg.append('g').classed('dimensionality-layout', true)
            .selectAll('polygon')
            .data(data.webs)
            .enter()
            .append('polygon')
            .attr('points', function(d) {
              return d;
            });
    this.svg.append('g')
        .classed('lines', true)
        .selectAll('line')
        .data(data.webPoints[0])
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', function(d) {
            return d.x;
        })
        .attr('y2', function(d) {
            return d.y;
        });
  }

  _initAreaData(data) {
    const onePiece = 2 * Math.PI / this.dimensionalityCount;
    let area = '';
    let points = [];
    for(let k = 0; k < this.dimensionalityCount; k++) {
      const r = this.axisLength * (data[k] - 0) / 100;
      const x = r * Math.sin(k * onePiece);
      const y = r * Math.cos(k * onePiece);
      area += x + ',' + y + ' ';
      points.push({
        x: x,
        y: y
      });
    }
    return {
        polygon: area,
        points: points
    };
  }

  draw(data, className, setting) {
    const areaData = this._initAreaData(data);
    console.log(areaData.polygon);
    let area = this.svg.append('g').classed(className, true)
        .append('polygon')
        .attr('points', areaData.polygon)
        .attr('stroke', '#7eb00a')
        .attr('fill', '#b6a2de');

    this.svg.append('g')
        .classed('circles', true)
        .data(areaData.points)
        .enter()
        .append('circle')
        .attr('cx', function(d) {
          return d.x;
          })
        .attr('cy', function(d) {
          return d.y;
        })
        .attr('r', 3)
        .attr('stroke', '#95706d');


  }
  getColor(idx) {
     const palette = [
         '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
         '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
         '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
         '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
     ]
     return palette[idx % palette.length];
 }
}
