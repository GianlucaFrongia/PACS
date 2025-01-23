import './DetailView.css'
import '../base/i18n.js'
import {Instance} from "../types/instance.ts";
import {TransformWrapper, TransformComponent} from "react-zoom-pan-pinch";

interface Props {
    instance: Instance
}

export const DetailViewImage = ({instance}: Props) => {
    return (
        <div className="image-container">
            {
                <TransformWrapper>
                    <TransformComponent>

                        <img
                            src={`${import.meta.env.VITE_ORTHANC_URL}/instances/${instance?.ID}/preview`}
                        />
                    </TransformComponent>
                </TransformWrapper>

            }
        </div>
    )
}
