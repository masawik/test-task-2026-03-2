import s from './_layout-styles/loading.module.scss'

export default function loading() {
  return (
    <div className={s.container}>
      <div className={`spinner dark ${s.spinner}`} />
    </div>
  )
}
