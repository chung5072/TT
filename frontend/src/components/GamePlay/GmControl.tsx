import { useFormik } from "formik"
import * as Yup from "yup"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"
export default function GmControl() {
    const mapStatus = useAppSelector((state:RootState) => state.game.mapStatus)
    const formik = useFormik({
        initialValues: {monsterId: 0, monsterNum: 0},
        validationSchema: Yup.object({
          userId: Yup.number()
          .required('Required'),
          userPw: Yup.number()
          .required('Required'),
        }),
        onSubmit: (data) => {
            const randomNum = data.monsterId === 1 ? (Math.floor(Math.random() * (4 - 1 + 1) + 1)) : data.monsterId === 2? (Math.floor(Math.random() * (3 - 1 + 1) + 1)): data.monsterId === 3 ? (Math.floor(Math.random() * (2 - 1 + 1) + 1)) : 1
            data.monsterNum = randomNum
            // 여기에서 submit 보내시면 돼요
        }
      })
    return (
        <div>
          <h1>GmControl</h1>
          <div id="gm-control-box">
            <form action="" onSubmit={ formik.handleSubmit }>
              
              <label id='monster-id-label' htmlFor="monsterId">Monster Id</label>
              <select id="monsterId" name="monsterId" onChange={formik.handleChange} value={ formik.values.monsterId }>
                <option value="1">{mapStatus===1 ? "코볼트": mapStatus===2 ? "코카트리스": mapStatus===3? "드워프전사": mapStatus=== 4?"미노타우르스": "인면충"}</option>
                <option value="2">{mapStatus===1 ? "도마뱀인간": mapStatus===2 ? "그리폰": mapStatus===3? "지하인": mapStatus=== 4?"아볼레스": "사슬악마"}</option>
                <option value="3">{mapStatus===1 ? "거대악어": mapStatus===2 ? "오거    ": mapStatus===3? "거미왕": mapStatus=== 4?"용": "가시악마"}</option>
                <option value="4">{mapStatus===1 ? "코아틀": mapStatus===2 ? "혼돈의 즙": mapStatus===3? "오튜그": mapStatus=== 4?"종말의 용": "천사"}</option>
              </select>
              <button type="submit">Start Fight</button>
            </form>

          </div>
        </div>
        
    )
}