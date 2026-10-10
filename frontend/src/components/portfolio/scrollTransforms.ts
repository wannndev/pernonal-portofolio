export function getScrollTransforms(width: number) {
  if (width >= 1280) {
    return {
      div1TranslateY: -835,
      div1TranslateX: 520,
      div2TranslateY: -855,
      div2TranslateX: -30,
      div3TranslateY: -1375,
      div3TranslateX: 520,
      div4TranslateY: -1395,
      div4TranslateX: -25,
      divScale: 0.75,
    };
  }
  if (width >= 1024) {
    return {
      div1TranslateY: -805,
      div1TranslateX: 500,
      div2TranslateY: -815,
      div2TranslateX: -10,
      div3TranslateY: -1335,
      div3TranslateX: 500,
      div4TranslateY: -1355,
      div4TranslateX: -10,
      divScale: 0.75,
    };
  }
  if (width >= 945) {
    return {
      div1TranslateY: -775,
      div1TranslateX: 470,
      div2TranslateY: -785,
      div2TranslateX: -10,
      div3TranslateY: -1255,
      div3TranslateX: 470,
      div4TranslateY: -1275,
      div4TranslateX: -10,
      divScale: 0.75,
    };
  }
  if (width >= 884) {
    return {
      div1TranslateY: -785,
      div1TranslateX: 430,
      div2TranslateY: -795,
      div2TranslateX: -10,
      div3TranslateY: -1255,
      div3TranslateX: 430,
      div4TranslateY: -1275,
      div4TranslateX: -10,
      divScale: 0.75,
    };
  }
  if (width >= 768) {
    return {
      div1TranslateY: -755,
      div1TranslateX: 370,
      div2TranslateY: -765,
      div2TranslateX: -20,
      div3TranslateY: -1195,
      div3TranslateX: 370,
      div4TranslateY: -1215,
      div4TranslateX: -25,
      divScale: 0.75,
    };
  }
  return {
    div1TranslateY: 0,
    div1TranslateX: 0,
    div2TranslateY: 0,
    div2TranslateX: 0,
    div3TranslateY: 0,
    div3TranslateX: 0,
    div4TranslateY: 0,
    div4TranslateX: 0,
    divScale: 1,
  };
}
