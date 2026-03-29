import s from './PageLoader.module.scss'

export const PageLoader = () => {
  return (
    <div className={s.container}>
      <div className={`spinner dark ${s.spinner}`} />
    </div>
  )
}
