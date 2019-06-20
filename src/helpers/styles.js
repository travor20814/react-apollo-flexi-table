// @flow

export function mixer(styles = []) {
  if (!Array.isArray(styles)) {
    return styles;
  }

  return styles.reduce((mixed, style) => {
    if (style) {
      return {
        ...mixed,
        ...style,
      };
    }

    return mixed;
  }, {});
}

export default {
  mixer,
};
