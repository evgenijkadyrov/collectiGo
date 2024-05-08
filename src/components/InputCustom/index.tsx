import {Form, Input} from "antd";
import {Rule} from "antd/lib/form";

interface InputCustomProps {
    name: string;
    placeholder: string;
    type?: string;
}

export const InputCustom = ({
                                name,
                                placeholder,
                                type,
                            }: InputCustomProps) => {
    const rules: Rule[] = [{required: true, message: "required field"}];

    return (
        <Form.Item name={name} shouldUpdate={true} rules={rules}>
            <Input placeholder={placeholder} type={type} size={"large"}/>
        </Form.Item>
    );
};