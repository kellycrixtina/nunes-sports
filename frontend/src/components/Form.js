import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const product = ref.current;
            product.name.value = onEdit.name;
            product.description.value = onEdit.description;
            product.price.value = onEdit.price;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const product = ref.current;

        if (
            !product.name.value ||
            !product.description.value ||
            !product.price.value
        ) { // Aqui a chave de abertura foi movida para o local correto
            return toast.warn("Preencha todos os campos!");
        } // E aqui a chave de fechamento foi movida para o local correto

        if (onEdit) {
            await axios
                .put("http://localhost:8800/" + onEdit.id, {
                    name: product.name.value,
                    description: product.description.value,
                    price: product.price.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        } else {
            await axios
                .post("http://localhost:8800", {
                    name: product.name.value,
                    description: product.description.value,
                    price: product.price.value,
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        product.name.value = "";
        product.description.value = "";
        product.price.value = "";

        setOnEdit(null);
        getProducts();
    };


    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="name" type="text" />
            </InputArea>
            <InputArea>
                <Label>Descrição</Label>
                <Input name="description" type="text" />
            </InputArea>
            <InputArea>
                <Label>Preço</Label>
                <Input name="price" type="text" />
            </InputArea>
            <Button type="submit">Adicionar</Button>
        </FormContainer>
    );
};
export default Form;