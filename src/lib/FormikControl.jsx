import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormikControl = (props) => {
    const { control, ...rest } = props;

    switch (control) {
        case "input":
            return <Input {...rest} className="shad-input" />;
        case "textarea":
            return <Textarea {...rest} className="shad-textarea" />;
        default:
            return <Input {...rest} className="shad-input" />;
    }
};

export default FormikControl;
