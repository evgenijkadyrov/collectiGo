import {Form, Input} from "antd";
import {Rule} from "antd/lib/form";

interface InputPasswordProps {
    name: string;
    placeholder: string;
    dependencies?: string[];
}

export const InputPassword = ({
                                  name,
                                  placeholder,
                                  dependencies,
                              }: InputPasswordProps) => {
    const rules: Rule[] = [
        {
            required: true,
            message: "Required field",
        },
        ({getFieldValue}) => ({
            validator(_, value) {
                if (!value) {
                    return Promise.resolve();
                }
                if (name === "confirmPassword") {
                    if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                }
                return Promise.resolve();
            },
        }),
    ];

    return (
        <Form.Item name={name} dependencies={dependencies} hasFeedback rules={rules}>
            <Input.Password placeholder={placeholder} size={"large"}/>
        </Form.Item>
    );
};