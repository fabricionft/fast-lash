import Container from '../../components/Container';
import styles from './AgendarAgendamento.module.css';
import useFormulario from '../../hooks/useFormulario';
import useAgendamnetos from '../../hooks/useAgendamentos';

import Form from '../../components/ItensForm/Form';
import HeaderForm from '../../components/ItensForm/HeaderForm';
import ConteudoForm from '../../components/ItensForm/ConteudoForm';
import FooterForm from '../../components/ItensForm/Footerform';
import Divisor from '../../components/ItensForm/Divisor';
import BotaoForm from '../../components/ItensForm/BotaoForm';

export default function AgendarAgendamento(){

  const {indice, validar, anterior} = useFormulario();
  const {agendamento, dias, anos, 
        preencherAgendamento, gerarDiasEAnos, buscarEnderecoPorCEP, salvarAgendamento} = useAgendamnetos();

  return(
    <Container centralizar={true}>
      <Form>
        <HeaderForm
          destino={"/"}
        >
          {indice == 1 ? "Dados pessoais"
            : indice == 2 ? "Dadoss de endereço" 
            : indice == 3 ? "Dados avaliativos"
            : indice == 4 && "Conclusão"
          }
        </HeaderForm>

        <ConteudoForm>
          {indice == 1 ? (
            <>
              <Divisor>
                <label>Nome</label>

                <input type="text" placeholder="Digite seu nome"
                  name="nome"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.nome || ""}
                />
              </Divisor>

              <Divisor>
                <label>Data nascimento</label>

                <div className={styles.linhaDataNascimento}>
                  <select className={styles.selectDataNascimento}
                    name='mesNascimento'
                    onChange={(e) => gerarDiasEAnos(e)}
                    value={agendamento.mesNascimento}
                  >
                    <option value="escolha">Mês</option>
                    <option value="01">Jan</option>
                    <option value="02">Fev</option>
                    <option value="03">Mar</option>
                    <option value="04">Abr</option>
                    <option value="05">Mai</option>
                    <option value="06">Jun</option>
                    <option value="07">Jul</option>
                    <option value="08">Ago</option>
                    <option value="09">Set</option>
                    <option value="10">Out</option>
                    <option value="11">Nov</option>
                    <option value="12">Dez</option>
                  </select>

                  <select className={styles.selectDataNascimento}
                    name='diaNascimento'
                    onChange={(e) => preencherAgendamento(e)}
                    value={agendamento.diaNascimento || ""}
                  >
                    <option value="escolha">Dia</option>
                    {
                      dias.map((dia) => (
                        <option key={dia} value={dia}>{dia}</option>
                      ))
                    }
                  </select>

                  <select className={styles.selectDataNascimento}
                    name='anoNascimento'
                    onChange={(e) => preencherAgendamento(e)}
                    value={agendamento.anoNascimento}
                  >
                    <option value="escolha">Ano</option>
                    {
                      anos.map((ano) => (
                        <option key={ano} value={ano}>{ano}</option>
                      ))
                    }
                  </select>
                </div>
              </Divisor>

              <Divisor>
                <label>Profissão</label>

                <input type="text" placeholder="Digite sua profissão" 
                  name="profissao"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.profissao || ""}
                />
              </Divisor>

              <Divisor>
                <label>Celular</label>

                <input type="number" placeholder="Digite apenas números" 
                  maxLength={11}
                  name="celular"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.celular || ""}
                />
              </Divisor>

              <Divisor>
                <label>Email</label>

                <input type="text" placeholder="Digite um email válido"
                  maxLength={80}
                  name="email"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.email || ""}
                />
              </Divisor>

              <Divisor>
                <label>RG</label>

                <input type="text" placeholder="Digite seu RG" 
                  maxLength={9} 
                  name="rg"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.rg || ""}
                />
              </Divisor>

              <Divisor>
                <label>CPF</label>

                <input type="number" placeholder="Digite apenas números" 
                  maxLength={11}
                  name="cpf"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.cpf || ""}
                />
              </Divisor>
            </>
          ) 
          : indice == 2 ? (
            <>
              <Divisor>
                <label>CEP</label>

                <div className={styles.linhaCep}>
                  <input type="text" placeholder="Digite apenas números"
                    maxLength={8}
                    name="cep"
                    onChange={(e) => preencherAgendamento(e)}
                    value={agendamento.cep || ""}
                  />
                  <button type="button" className={styles.btnBuscar} onClick={ buscarEnderecoPorCEP}>Buscar</button>
                </div>
              </Divisor>

              <Divisor>
                <label>Estado</label>

                <select 
                  name='estado'
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.estado || ""}
                >
                  <option value="escolha">Escolha</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                  <option value="EX">Estrangeiro</option>
                </select>
              </Divisor>

              <Divisor>
                <label>Cidade</label>

                <input type="text" placeholder="Digite o nome de sua cidade"
                  name="cidade"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.cidade || ""}
                />
              </Divisor>

              <Divisor>
                <label>Bairro</label>

                <input type="text" placeholder="Digite o nome de seu bairro"
                  name="bairro"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.bairro || ""}
                />
              </Divisor>

              <Divisor>
                <label>Rua</label>

                <input type="text" placeholder="Digite o nome da sua rua"
                  name="rua"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.rua || ""}
                />
              </Divisor>

              <Divisor>
                <label>Número</label>

                <input type="number" placeholder="Digite o número da sua casa"
                  name="numero"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.numero || ""}
                />
              </Divisor>

              <Divisor>
                <label>Complemento (opcional)</label>
                
                <input type="text" placeholder="Digite um ponto de referência"
                  name="complemento"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.complemento || ""}
                />
              </Divisor>
            </>
          ) 
          : indice == 3 ? (
            <>
              <Divisor>
                <label>Está de rímel?</label>

                <select 
                  name="estaDeRimel"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.estaDeRimel}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Divisor>

              <Divisor>
                <label>É gestante?</label>
                
                <select 
                  name="estaGravida"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.estaGravida}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Divisor>

              <Divisor>
                <label>Fez algum procedimento recentemente nos olhos?</label>

                <select 
                  name="procedimentoRecenteNosOlhos"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.procedimentoRecenteNosOlhos}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Divisor>

              <Divisor>
                <label>Possui alergia à esmaltes/cométicos/cianoacrilato?</label>

                <select 
                  name="possuiAlergia"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.possuiAlergia}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Divisor>

              <Divisor>
                <label>Possui problemas na tireóide?</label>

                <select 
                  name="possuiProblemaNaTireoide"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.possuiProblemaNaTireoide}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Divisor>

              <Divisor>
                <label>Possui glaucoma/blefarite/algum problema ocular?</label>

                <select 
                  name="possuiProblemaOcular"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.possuiProblemaOcular}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Divisor>

              <Divisor>
                <label>Está em tratamento oncológico?</label>

                <select 
                  name="estaEmTratamentoOncologico"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.estaEmTratamentoOncologico}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Divisor>

              <Divisor>
                <label>Dorme de lado?</label>

                <select 
                  name="dormeDeLado"
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.dormeDeLado}
                >
                  <option value="nao">Não</option>
                  <option value="sim">Sim</option>
                </select>
              </Divisor>
            </>
          ) 
          : indice == 4 && (
            <>
              <Divisor>
                <label>Existe algum procedimento que julgue necessário informar ao profissional antes do procedimento? (opcional)</label>
                
                <textarea className={styles.textareaDetalhe}
                  name='detalhesProcedimentoAdcional'
                  onChange={(e) => preencherAgendamento(e)}
                  value={agendamento.detalhesProcedimentoAdcional}
                ></textarea>
              </Divisor>

              {agendamento.possuiAlergia == 'sim' && (
                <Divisor>
                  <label>Especifique sua alergia à esmaltes/cométicos/cianoacrilato</label>

                  <textarea className={styles.textareaDetalhe}
                    name='detalhesAlergia'
                    onChange={(e) => preencherAgendamento(e)}
                    value={agendamento.detalhesAlergia}
                  ></textarea>
                </Divisor>
              )}

              {agendamento.possuiProblemaOcular == 'sim' && (
                <Divisor>
                  <label>Especifique seu glaucoma/blefarite/problema ocular</label>

                  <textarea className={styles.textareaDetalhe}
                    name='detalhesProblemaOcular'
                    onChange={(e) => preencherAgendamento(e)}
                    value={agendamento.detalhesProblemaOcular}
                  ></textarea>
                </Divisor>
              )}

              {agendamento.dormeDeLado == 'sim' && (
                <Divisor>
                  <label>De qual lado você dorme?</label>

                  <select
                    name='detalhesLado'
                    onChange={(e) => preencherAgendamento(e)}
                    value={agendamento.detalhesLado}
                  >
                    <option value="Ambos">Ambos</option>
                    <option value="Apenas direito">Apenas direito</option>
                    <option value="Apenas esquerdo">Apenas esquerdo</option>
                  </select>
                </Divisor>
              )}
            </>
          )}
        </ConteudoForm>

        <FooterForm>
          {indice == 1 ? (
            <BotaoForm
              executarAcao={() => validar(agendamento)}
              textoBotao={"próximo"}
            />
          ) 
          : indice == 2 ? (
            <>
              <BotaoForm
                estilizacao={"anterior"}
                executarAcao={anterior}
                textoBotao={"Anterior"}
              />

              <BotaoForm
                executarAcao={() => validar(agendamento)}
                textoBotao={"próximo"}
              />
            </>
          ) 
          : indice == 3 ? (
            <>
              <BotaoForm
                estilizacao={"anterior"}
                executarAcao={anterior}
                textoBotao={"Anterior"}
              />

              <BotaoForm
                executarAcao={() => validar(agendamento)}
                textoBotao={"próximo"}
              />
            </>
          ) 
          : indice == 4 && (
            <>
              <BotaoForm
                estilizacao={"anterior"}
                executarAcao={anterior}
                textoBotao={"Anterior"}
              />

              <BotaoForm
                estilizacao={"finalizar"}
                executarAcao={() => salvarAgendamento(agendamento)}
                textoBotao={"Agendar"}
              />
            </>
          )}
        </FooterForm>
      </Form>
    </Container>
  );
}