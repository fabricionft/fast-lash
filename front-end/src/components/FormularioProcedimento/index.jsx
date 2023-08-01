import styles from './FormularioProcedimento.module.css';
import { useParams } from 'react-router-dom';
import useProcedimento from '../../hooks/useProcedimento';
import useFormulario from '../../hooks/useFormulario';
import Imagem from '../Imagem';

import Form from '../ItensForm/Form';
import HeaderForm from '../ItensForm/HeaderForm';
import ConteudoForm from '../ItensForm/ConteudoForm';
import FooterForm from '../ItensForm/Footerform';
import Divisor from '../ItensForm/Divisor';
import BotaoForm from '../ItensForm/BotaoForm';

export default function FormularioProcedimento(){

  const {indice, validar, anterior} = useFormulario();
  const {id} = useParams();
  const {procedimento, horarios, preencherProcedimento, preencherProcedimentolhoDireito,
         preencherProcedimentolhoEsquerdo, buscarHorarios,
         agendarProcedimento, editarProcedimento} = useProcedimento();

  return(
    <Form>
      <HeaderForm
        destino={(localStorage.getItem('rotaAnteriorFormularioProcedimento') == "/detalhesAgendamento/"+id) ? "/detalhesAgendamento/"+id : "/procedimento/"+id}
      >
        Dados do procedimento
      </HeaderForm>

      <ConteudoForm>
        {indice == 1 ? (
          <>
            <Divisor>
              <label>Mapping</label>

              <input type="text" placeholder="Digite o mapping" 
                name='mapping'
                onChange={(e) => preencherProcedimento(e)}
                value={procedimento.mapping || ""}
              />
            </Divisor>

            <Divisor>
              <label>Estilo</label>

              <input type="text" placeholder="Digite o estilo" 
                name='estilo'
                onChange={(e) => preencherProcedimento(e)}
                value={procedimento.estilo || ""}
              />
            </Divisor>

            <Divisor>
              <label>Modelos dos fios</label>

              <input type="text" placeholder="Digite o modelo dos fios" 
                name='modeloDosFios'
                onChange={(e) => preencherProcedimento(e)}
                value={procedimento.modeloDosFios || ""}
              />
            </Divisor>

            <Divisor>
              <label>Espessura</label>

              <input type="number" placeholder="Digite a espessura" 
                name='espessura'
                onChange={(e) => preencherProcedimento(e)}
                value={procedimento.espessura || ""}
              />
            </Divisor>

            <Divisor>
              <label>Curvatura</label>

              <input type="number" placeholder="Digite a curvatura"
                name='curvatura'
                onChange={(e) => preencherProcedimento(e)}
                value={procedimento.curvatura || ""}
              />
            </Divisor>
          </>
        ) 
        : indice == 2 ? (
          <>
            <Divisor>
              <label className={styles.labelOlho}>Olho esquerdo</label>

              {
                procedimento && procedimento.fiosOlhoEsquerdo.map((fio, index) => (
                  <select key={index} id='fiosOlhoEsquerdo' name={"olhoE-"+index} className={styles.selectCilios+" "+styles[['a', 'b', 'c', 'd', 'e', 'f'][index]]}
                    onChange={(e) => preencherProcedimentolhoEsquerdo(e, index)}
                    value={fio}
                  >
                    {[7, 8, 9, 10, 11, 12, 12, 14, 15].map((numero, index) => (
                      <option key={index} value={numero}>{numero}</option>
                    ))}
                  </select>
                ))
              }

              <Imagem
                nomeImagem={"imgCilios"}
                tamanho={"100%"}
              />
            </Divisor>

            <Divisor>
              <label className={styles.labelOlho}>Olho direito</label>

              {
                procedimento && procedimento.fiosOlhoDireito.map((fio, index) => (
                  <select key={index} name={"olhoD-"+index} className={styles.selectCilios+" "+styles[['a', 'b', 'c', 'd', 'e', 'f'][index]]}
                    onChange={(e) => preencherProcedimentolhoDireito(e, index)}
                    value={fio}
                  >
                    {[7, 8, 9, 10, 11, 12, 12, 14, 15].map((numero, index) => (
                      <option key={index} value={numero}>{numero}</option>
                    ))}
                  </select>
                ))
              }

              <Imagem
                nomeImagem={"imgCilios"}
                tamanho={"100%"}
              />
            </Divisor>
          </>
        ) 
        : (indice == 3 && location.pathname == "/agendarProcedimento/"+id) && (
          <>
            <Divisor>
              <label>Data</label>

              <input type="date"
                name='data'
                onChange={(e) => buscarHorarios(e.target.value)}
                value={procedimento.data || ""}
              />
            </Divisor>

            <Divisor>
              <label>Horário</label>

              <select
                name='horario'
                onChange={(e) => preencherProcedimento(e)}
                value={procedimento.horario}
              >
                <option value="escolha">Escolha o horário</option>
                {horarios.map((horario, index) =>  <option key={index} value={horario}>{horario}</option>)}
              </select>
            </Divisor>
          </>
        )}
      </ConteudoForm>

      <FooterForm>
        {indice == 1 ? (
          <>
            <BotaoForm
              executarAcao={() => validar(procedimento)}
              textoBotao={"próximo"}
            />
          </>
        )
        : indice == 2 && location.pathname == ("/agendarProcedimento/"+id) ? (
          <>
            <BotaoForm
              estilizacao={"anterior"}
              executarAcao={anterior}
              textoBotao={"Anterior"}
            />

            <BotaoForm
              executarAcao={() => validar(procedimento)}
              textoBotao={"próximo"}
            />
          </>
        )
        : indice == 2 && location.pathname != ("/agendarProcedimento/"+id) ? (
          <>
            <BotaoForm
              estilizacao={"anterior"}
              executarAcao={anterior}
              textoBotao={"Anterior"}
            />

            <BotaoForm
              estilizacao={"finalizar"}
              executarAcao={() => editarProcedimento(procedimento)}
              textoBotao={"Agendar"}
            />
          </>
        )
        : indice == 3 && (
          <>
            <BotaoForm
              estilizacao={"anterior"}
              executarAcao={anterior}
              textoBotao={"Anterior"}
            />

            <BotaoForm
              estilizacao={"finalizar"}
              executarAcao={() => agendarProcedimento(procedimento)}
              textoBotao={"Agendar"}
            />
          </>
        )}
      </FooterForm>
    </Form>
  );
}