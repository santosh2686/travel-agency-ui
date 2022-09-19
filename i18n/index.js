const en = () => import('./en').then((res) => res.default)

const fr = () => import('./fr').then((res) => res.default)

export {
  en,
  fr,
}
