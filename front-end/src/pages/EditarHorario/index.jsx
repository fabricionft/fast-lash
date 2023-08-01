import Container from '../../components/Container';
import styles from './EditarHorario.module.css';
import { useParams } from 'react-router-dom';
import useProcedimento from '../../hooks/useProcedimento';

import Form from '../../components/ItensForm/Form';
import HeaderForm from '../../components/ItensForm/HeaderForm';
import ConteudoForm from '../../components/ItensForm/ConteudoForm';
import FooterForm from '../../components/ItensForm/Footerform';
import Divisor from '../../components/ItensForm/Divisor';
import BotaoForm from '../../components/ItensForm/BotaoForm';

export default function(){

  const {id} = useParams();
  const {procedimento, preencherProcedimento,
        buscarHorarios, horarios, editarHorario} = useProcedimento();

  return(
    <Container centralizar={true}>
      <Form>
        <HeaderForm
          destino={"/procedimento/"+id}
        >
          Alterar data
        </HeaderForm>

        <ConteudoForm>
          <Divisor>
            <label>Data</label>

            <input type="date" className={styles.inputData}
              name='data'
              onChange={(e) => buscarHorarios(e.target.value)}
              value={procedimento.data || ""}
            />
          </Divisor>

          <Divisor>
            <label>Horário</label>

            <select className={styles.inputData} 
              name='horario'
              onChange={(e) => preencherProcedimento(e)}
              value={procedimento.horario}
            >
              <option value="escolha">Escolha o horário</option>
              {horarios.map((horario, index) =>  <option key={index} value={horario}>{horario}</option>)}
            </select>
          </Divisor>
        </ConteudoForm>

        <FooterForm>
          <BotaoForm
            estilizacao={"finalizar"}
            textoBotao={"Alterar"}
            executarAcao={() => editarHorario(procedimento)}
          />
        </FooterForm>
      </Form>
    </Container>
  );
}