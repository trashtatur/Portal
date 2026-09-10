import Navbar from "../../UI-shared/components/navbar/navbar.component";
import useAppDispatch from "../../Infrastructure/hooks/useDispatch";
import {useEffect} from "react";
import bootstrapMainPageThunk from "../../store/thunks/bootstrap-main-page.thunk";
import {useDispatch} from "react-redux";
import useAppSelector from "../../Infrastructure/hooks/useSelector";
import selectAllSystems from "../../store/selector/select-all-systems";

const PageMain = () => {
    const dispatch = useAppDispatch();

    const systems = useAppSelector(selectAllSystems);

    useEffect(() => {
        dispatch(bootstrapMainPageThunk());
    }, []);

    return (
        <div>
            <Navbar/>
            {systems.map(system => (
                <div>
                    {system}
                </div>
            ))}
        </div>
    )
}

export default PageMain;
