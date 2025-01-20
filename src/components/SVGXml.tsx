import React from 'react';
import {SvgXml} from 'react-native-svg';

interface SVGTypes {
  icon: string;
  width?: number;
  height?: number;
  style?: object;
}

const SVGXml = ({icon, width = 24, height = 33, style}: SVGTypes) => {
  return <SvgXml xml={icon} height={height} width={width} style={style} />;
};

export default SVGXml;
