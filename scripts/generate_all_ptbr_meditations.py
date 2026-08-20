import asyncio
import os
import sys
import json
import edge_tts

if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

VOICES = {
    "female_serene": "pt-BR-FranciscaNeural",
    "female_calm": "pt-BR-ThalitaNeural",
    "male_deep": "pt-BR-AntonioNeural",
}

SESSIONS = [
    # 1. Entrada Grátis
    {
        "id": "mindfulness_mindset_1",
        "filename": "meditacao_mindset.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-16%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Acolhimento e Postura",
                "focus": "breathing",
                "text": "Bem-vindo a este momento de pausa e renovação. Encontre uma posição confortável, com a coluna ereta e os ombros relaxados. Feche suavemente os olhos e permita-se pousar completamente no agora."
            },
            {
                "id": 2,
                "phase": "2. Ancoragem Respiratória",
                "focus": "breathing",
                "text": "Inspire profundamente pelo nariz em quatro tempos... segure o ar com calma... e expire devagar pela boca, soltando todo o peso acumulado nos ombros e no peito."
            },
            {
                "id": 3,
                "phase": "3. Respiração de Alívio",
                "focus": "breathing",
                "text": "Mais uma vez... puxe o ar com serenidade... retenha por instantes... e solte liberando qualquer preocupação ou pressa. Sinta o corpo responder ao ritmo da calma."
            },
            {
                "id": 4,
                "phase": "4. Desaceleração & Escaneamento",
                "focus": "awareness",
                "text": "Solte a tensão do maxilar, relaxe a testa e os olhos. Sinta o ritmo do seu coração se harmonizar com a respiração tranquila e segura."
            },
            {
                "id": 5,
                "phase": "5. Observador Sem Julgamento",
                "focus": "awareness",
                "text": "Se pensamentos ou tarefas surgirem, apenas observe-os como nuvens passando no céu aberto, sem se apegar, voltando suavemente a atenção para o ar que entra e sai."
            },
            {
                "id": 6,
                "phase": "6. Reprogramação de Mindset",
                "focus": "mindset",
                "text": "Repita em seu íntimo: Eu escolho a serenidade. Minha mente é clara, lúcida e governada por Deus. Eu repouso na certeza da paz e do discernimento."
            },
            {
                "id": 7,
                "phase": "7. Integração & Retorno",
                "focus": "integration",
                "text": "Respire fundo uma última vez, movimente suavemente as mãos e abra os olhos com calma, levando este foco e equilíbrio para o seu dia."
            }
        ]
    },

    # 2. Calma no Trânsito
    {
        "id": "meditacao_transito",
        "filename": "meditacao_transito.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-15%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Postura Confortável no Volante",
                "focus": "awareness",
                "text": "Mantenha os olhos bem abertos e atentos na via. Ajuste sua postura no banco, solte o aperto exagerado das mãos no volante e respire de forma consciente."
            },
            {
                "id": 2,
                "phase": "2. Respiração no Semáforo",
                "focus": "breathing",
                "text": "Inspire suavemente pelo nariz, enchendo o abdômen... e expire soltando a pressa, a impaciência e a urgência. O trânsito tem seu fluxo; sua paz depende de você."
            },
            {
                "id": 3,
                "phase": "3. Desarme de Irritabilidade",
                "focus": "awareness",
                "text": "Destranque os dentes, relaxe o maxilar, a testa e os ombros. Releia qualquer fechada ou imprevisto com generosidade e sabedoria."
            },
            {
                "id": 4,
                "phase": "4. Salmo 121 & Proteção",
                "focus": "mindset",
                "text": "O Senhor guardará a tua saída e a tua entrada, desde agora e para sempre. Você está seguro, guardado pela graça e pela paciência de Deus."
            },
            {
                "id": 5,
                "phase": "5. Direção Consciente e Segura",
                "focus": "integration",
                "text": "Siga o seu caminho em serenidade, atento ao trajeto, respeitando o próximo e desfrutando de uma mente lúcida e em paz no volante."
            }
        ]
    },

    # 3. Sono Profundo
    {
        "id": "meditacao_sono",
        "filename": "meditacao_sono.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-18%",
        "pitch": "-4Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Preparação para o Repouso",
                "focus": "breathing",
                "text": "Deite-se confortavelmente, feche os olhos e sinta o peso do dia começar a se dissolver. Tudo o que você precisava fazer hoje já terminou."
            },
            {
                "id": 2,
                "phase": "2. Respiração 4-7-8",
                "focus": "breathing",
                "text": "Inspire suavemente pelo nariz em quatro tempos... segure o ar por sete instantes... e solte lentamente pela boca em oito tempos, relaxando profundamente."
            },
            {
                "id": 3,
                "phase": "3. Descompressão do Corpo",
                "focus": "awareness",
                "text": "Solte os ombros no travesseiro. Desarme os punhos, solte a mandíbula e sinta o corpo afundar no acolhimento seguro da cama."
            },
            {
                "id": 4,
                "phase": "4. Entrega das Preocupações",
                "focus": "mindset",
                "text": "O que precisa ser resolvido amanhã, Deus já está cuidando. Nada ameaça o seu repouso. Entregue cada pensamento nas mãos do Criador."
            },
            {
                "id": 5,
                "phase": "5. Salmo 4:8 & Sono Profundo",
                "focus": "integration",
                "text": "Em paz me deito e logo pego no sono, pois só Tu, Senhor, me fazes repousar em perfeita segurança. Deixe o sono vir como um manto de restauração."
            }
        ]
    },

    # 4. Ansiedade
    {
        "id": "meditacao_ansiedade",
        "filename": "meditacao_ansiedade.mp3",
        "voice": VOICES["female_calm"],
        "rate": "-16%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Acolhimento da Emoção",
                "focus": "breathing",
                "text": "Coloque suavemente uma mão sobre o peito e a outra sobre o abdômen. Você está em um lugar seguro agora. Permita-se parar e respirar."
            },
            {
                "id": 2,
                "phase": "2. Respiração de Alívio Vagal",
                "focus": "breathing",
                "text": "Puxe o ar suavemente pelo nariz... sinta a barriga expandir... segure por um breve instante... e sopre bem devagar, acalmando o ritmo do seu coração."
            },
            {
                "id": 3,
                "phase": "3. Soltura do Peito e Garganta",
                "focus": "awareness",
                "text": "Permita que o aperto no peito e na garganta se dissolva. Repita internamente: Eu estou seguro. Isso vai passar. O controle pertence a Deus."
            },
            {
                "id": 4,
                "phase": "4. Filipenses 4:6-7",
                "focus": "mindset",
                "text": "Não ande ansioso por coisa alguma. Lance sobre Deus cada medo agora. A paz que excede todo o entendimento humano guarda o seu coração e a sua mente."
            },
            {
                "id": 5,
                "phase": "5. Firmeza e Calmaria",
                "focus": "integration",
                "text": "Respire com naturalidade, sinta a calma preenchendo o seu ser e abra os olhos com a certeza de que você é amado e sustentado."
            }
        ]
    },

    # 5. Trabalho
    {
        "id": "meditacao_trabalho",
        "filename": "meditacao_trabalho.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Pausa Estratégica",
                "focus": "breathing",
                "text": "Afaste-se da tela por um instante. Apoie os pés firmes no chão, relaxe as mãos sobre a mesa e faça uma respiração profunda."
            },
            {
                "id": 2,
                "phase": "2. Limpeza do Ruído Mental",
                "focus": "breathing",
                "text": "Inspire clareza e foco... e ao soltar o ar, libere a pressa, a sensação de sobrecarga e a ansiedade pelos resultados."
            },
            {
                "id": 3,
                "phase": "3. Discernimento e Calma",
                "focus": "awareness",
                "text": "Se alguém precisa de sabedoria, peça a Deus. Você não precisa agir por impulso; você tem serenidade para discernir a melhor decisão."
            },
            {
                "id": 4,
                "phase": "4. Ancoragem de Propósito",
                "focus": "mindset",
                "text": "Faça cada tarefa com excelência, calma e integridade. O seu trabalho é oportunidade de servir. Sua mente é organizada, lúcida e produtiva."
            },
            {
                "id": 5,
                "phase": "5. Foco Renovado",
                "focus": "integration",
                "text": "Abra os olhos com determinação e paz, pronto para realizar o seu melhor com equilíbrio e sabedoria."
            }
        ]
    },

    # 6. Despertar
    {
        "id": "meditacao_despertar",
        "filename": "meditacao_despertar.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-15%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Bom Dia à Vida",
                "focus": "breathing",
                "text": "Sente-se com as costas eretas, acolha a luz do novo dia e agradeça em seu coração por mais esta oportunidade de recomeçar."
            },
            {
                "id": 2,
                "phase": "2. Respiração Revigorante",
                "focus": "breathing",
                "text": "Puxe o ar com energia pelo nariz, expandindo o peito... e solte com um sorriso suave, enchendo-se de ânimo, disposição e vigor."
            },
            {
                "id": 3,
                "phase": "3. O Dom da Gratidão",
                "focus": "awareness",
                "text": "Pense em uma bênção real na sua vida. Agradeça pela saúde, pelo ar que respira e pelo cuidado constante de Deus sobre os seus caminhos."
            },
            {
                "id": 4,
                "phase": "4. Salmo 143:8 & Direcionamento",
                "focus": "mindset",
                "text": "Faze-me ouvir da Tua fidelidade pela manhã, pois em Ti confio. Mostra-me o caminho em que devo andar, guarda os meus passos e ilumina as minhas escolhas."
            },
            {
                "id": 5,
                "phase": "5. Pronto para o Dia",
                "focus": "integration",
                "text": "Abra os olhos com coragem, esperança e paz. Este dia será abençoado, sereno e muito produtivo!"
            }
        ]
    },

    # 7. Fase 1: Ancoragem Sonora
    {
        "id": "jornada_fase_1_ancoragem_sonora",
        "filename": "jornada_fase_1.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-16%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Acomodação no Agora",
                "focus": "breathing",
                "text": "Bem-vindo à Fase 1 da sua jornada. Encontre uma postura confortável e sinta o peso do seu corpo seguro e apoiado."
            },
            {
                "id": 2,
                "phase": "2. Percepção dos Sons",
                "focus": "awareness",
                "text": "Abra sua audição para os sons ao seu redor, próximos e distantes. Apenas receba cada som sem julgar ou tentar modificá-lo."
            },
            {
                "id": 3,
                "phase": "3. O Corpo no Espaço",
                "focus": "awareness",
                "text": "Sinta o contato dos pés com o chão e as mãos descansando com leveza. Você está presente, calmo e seguro no agora."
            },
            {
                "id": 4,
                "phase": "4. Conclusão da Fase 1",
                "focus": "integration",
                "text": "Respire fundo. Você concluiu o primeiro passo da sua evolução rumo à serenidade e ao autogoverno."
            }
        ]
    },

    # 8. Fase 2: Alívio Físico & Escaneamento
    {
        "id": "jornada_fase_2_escaneamento_rapido",
        "filename": "jornada_fase_2.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-16%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Consciência Corporal",
                "focus": "awareness",
                "text": "Na Fase 2, direcionamos a luz da atenção para o corpo físico. Feche suavemente os olhos e respire com calma."
            },
            {
                "id": 2,
                "phase": "2. Rosto e Mandíbula",
                "focus": "awareness",
                "text": "Solte a testa, suavize os olhos e desencaixe os dentes. Deixe o rosto repousar completamente livre de tensão."
            },
            {
                "id": 3,
                "phase": "3. Ombros e Respiração",
                "focus": "breathing",
                "text": "Ao soltar o ar, sinta os ombros descerem e relaxarem. Deixe todo o peso do cansaço escorrer pelos braços e mãos."
            },
            {
                "id": 4,
                "phase": "4. Fase 2 Concluída",
                "focus": "integration",
                "text": "Sinta seu corpo livre de nós de tensão. Você concluiu a Fase 2 com harmonia e leveza."
            }
        ]
    },

    # 9. Fase 3: Respiração Serena & Clareza
    {
        "id": "jornada_fase_3_respiracao_serena",
        "filename": "jornada_fase_3.mp3",
        "voice": VOICES["female_calm"],
        "rate": "-16%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Estabelecendo a Âncora",
                "focus": "breathing",
                "text": "Bem-vindo à Fase 3. Hoje aprofundamos a prática com foco sustentado na respiração como âncora de serenidade."
            },
            {
                "id": 2,
                "phase": "2. O Ritmo do Ar",
                "focus": "breathing",
                "text": "Observe o ar entrando fresco pelas narinas, preenchendo os pulmões e o abdômen... e sinta a saída lenta e morna do ar."
            },
            {
                "id": 3,
                "phase": "3. Mente Estável",
                "focus": "awareness",
                "text": "Se a mente divagar com pensamentos ou preocupações, gentilmente traga o foco de volta ao movimento da respiração, sem cobranças."
            },
            {
                "id": 4,
                "phase": "4. Fase 3 Concluída",
                "focus": "integration",
                "text": "Respire com gratidão. Você fortaleceu sua capacidade de foco e presença interior."
            }
        ]
    },

    # 10. Fase 4: Superando Desafios
    {
        "id": "jornada_fase_4_superando_desafios",
        "filename": "jornada_fase_4.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-16%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Acolhendo Desafios",
                "focus": "awareness",
                "text": "Na Fase 4, aprendemos a manter a serenidade mesmo diante de emoções difíceis ou momentos de sobrecarga."
            },
            {
                "id": 2,
                "phase": "2. Onde Reside a Tensão?",
                "focus": "awareness",
                "text": "Observe onde a ansiedade ou o cansaço repercutem no seu corpo. Respire enviando ar calmo e espaçoso para essa região."
            },
            {
                "id": 3,
                "phase": "3. Permissão e Gentileza",
                "focus": "mindset",
                "text": "Lembre-se: Toda sensação difícil é passageira. Deus é o seu refúgio e fortaleza. Você é maior do que qualquer problema temporário."
            },
            {
                "id": 4,
                "phase": "4. Fase 4 Concluída",
                "focus": "integration",
                "text": "Você deu um salto de maturidade emocional. A paz que excede o entendimento guarda o seu coração."
            }
        ]
    },

    # 11. Fase 5: Bondade Amorosa, Perdão & Empatia
    {
        "id": "jornada_fase_5_bondade_amorosa",
        "filename": "jornada_fase_5.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-16%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. O Coração Compassivo",
                "focus": "awareness",
                "text": "Bem-vindo à Fase 5. Hoje abrimos o coração para cultivar a bondade amorosa, o perdão sincero e a compaixão."
            },
            {
                "id": 2,
                "phase": "2. Paz para Si Mesmo",
                "focus": "mindset",
                "text": "Repita mentalmente com carinho: Que eu esteja em paz. Que eu tenha saúde. Que eu viva em segurança e alegria."
            },
            {
                "id": 3,
                "phase": "3. Irradiando Amor aos Outros",
                "focus": "mindset",
                "text": "Visualize as pessoas que você ama e envie esses mesmos votos. Em seguida, estenda essa graça até aqueles que te desafiaram ou magoaram."
            },
            {
                "id": 4,
                "phase": "4. Fase 5 Concluída",
                "focus": "integration",
                "text": "O amor é o vínculo perfeito da paz. Você concluiu a Fase 5 com o coração leve e restaurado."
            }
        ]
    },

    # 12. Fase 6: Harmonia Plena
    {
        "id": "jornada_fase_6_harmonia_plena",
        "filename": "jornada_fase_6.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-16%",
        "pitch": "-3Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. Integração dos Pilares",
                "focus": "breathing",
                "text": "Na Fase 6, unificamos os pilares da presença: a respiração consciente, a audição aberta e a tranquilidade no corpo."
            },
            {
                "id": 2,
                "phase": "2. Navegando pelas Sensações",
                "focus": "awareness",
                "text": "Permita que sua atenção flua com naturalidade: do ar nas narinas para os sons do ambiente e a quietude do corpo."
            },
            {
                "id": 3,
                "phase": "3. O Santuário da Calma",
                "focus": "awareness",
                "text": "Mesmo que haja barulho ou agitação no mundo exterior, dentro de você reina um santuário inabalável de paz e presença divina."
            },
            {
                "id": 4,
                "phase": "4. Fase 6 Concluída",
                "focus": "integration",
                "text": "Parabéns por atingir esta profundidade. Você dominou a integração sensorial e o autogoverno."
            }
        ]
    },

    # 13. Fase 7: Sono Restaurador
    {
        "id": "jornada_fase_7_sono_restaurador",
        "filename": "jornada_fase_7.mp3",
        "voice": VOICES["male_deep"],
        "rate": "-18%",
        "pitch": "-4Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. O Dia Chegou ao Fim",
                "focus": "breathing",
                "text": "Deite-se confortavelmente. Nada mais precisa ser resolvido hoje. O dia acabou e você está acolhido em segurança."
            },
            {
                "id": 2,
                "phase": "2. Pesagem dos Membros",
                "focus": "awareness",
                "text": "Sinta as pernas pesadas e relaxadas... solte o tronco... alivie os braços, o pescoço e a face sobre o travesseiro."
            },
            {
                "id": 3,
                "phase": "3. Ondas Suaves de Sono",
                "focus": "mindset",
                "text": "Deixe a respiração ficar cada vez mais suave e silenciosa. Deixe o sono restaurador envolver sua mente e seu corpo."
            },
            {
                "id": 4,
                "phase": "4. Fase 7 Concluída",
                "focus": "integration",
                "text": "Durma em paz. Que a presença de Deus guarde o seu descanso e renove todas as suas forças."
            }
        ]
    },

    # 14. Fase 8: Imersão Plena & Quietude Contemplativa
    {
        "id": "jornada_fase_8_imersao_plena",
        "filename": "jornada_fase_8.mp3",
        "voice": VOICES["female_serene"],
        "rate": "-16%",
        "pitch": "-2Hz",
        "steps": [
            {
                "id": 1,
                "phase": "1. O Topo da Jornada",
                "focus": "breathing",
                "text": "Você chegou à Fase 8, a maestria da serenidade. Uma prática profunda de contemplação, autorregulação e presença pura."
            },
            {
                "id": 2,
                "phase": "2. O Santuário Interior",
                "focus": "awareness",
                "text": "Acomode-se no seu santuário interior. Deixe que a respiração calma e a presença de Deus preencham cada pensamento."
            },
            {
                "id": 3,
                "phase": "3. O Silêncio Sagrado",
                "focus": "mindset",
                "text": "No silêncio sereno, encontramos discernimento e descanso. Não há nada a temer; você repousa na certeza da graça e do propósito."
            },
            {
                "id": 4,
                "phase": "4. Consagração das 8 Fases",
                "focus": "integration",
                "text": "Parabéns, Mestre da Serenidade! Você completou a jornada das 8 fases. Viva em paz, viva com clareza e propósito!"
            }
        ]
    }
]

async def generate_all():
    output_dir = os.path.join(os.getcwd(), "public", "audio")
    os.makedirs(output_dir, exist_ok=True)

    timing_results = {}

    for session in SESSIONS:
        filename = session["filename"]
        audio_path = os.path.join(output_dir, filename)
        voice = session["voice"]
        rate = session["rate"]
        pitch = session["pitch"]

        # Concatenate text with natural pause breaks
        full_text = " ... ".join([s["text"] for s in session["steps"]])

        print(f"🎙️ Gerando {filename} com voz {voice}...")
        communicate = edge_tts.Communicate(full_text, voice=voice, rate=rate, pitch=pitch)
        await communicate.save(audio_path)
        print(f"  ✅ Salvo: {audio_path} ({os.path.getsize(audio_path):,} bytes)")

        # Calculate timing intervals for steps
        current_sec = 0.0
        calculated_steps = []
        for step in session["steps"]:
            words_count = len(step["text"].split())
            # Pace estimate: ~1.7 words/sec + 2.5s pause
            step_duration = round((words_count / 1.7) + 2.5, 1)
            start_sec = round(current_sec, 1)
            end_sec = round(current_sec + step_duration, 1)
            calculated_steps.append({
                "id": step["id"],
                "phase": step["phase"],
                "focus": step["focus"],
                "startSeconds": start_sec,
                "endSeconds": end_sec,
                "text": step["text"]
            })
            current_sec = end_sec

        total_dur = round(current_sec)
        timing_results[session["id"]] = {
            "audioUrl": f"/audio/{filename}",
            "durationSeconds": total_dur,
            "steps": calculated_steps
        }

    # Save timing map to a json for easy inspection
    timing_file = os.path.join(os.getcwd(), "scripts", "meditation_timings.json")
    with open(timing_file, "w", encoding="utf-8") as f:
        json.dump(timing_results, f, ensure_ascii=False, indent=2)
    print(f"\n🎉 Todas as 14 locuções em PT-BR foram geradas com sucesso!")
    print(f"📁 Timings salvos em: {timing_file}")

if __name__ == "__main__":
    asyncio.run(generate_all())
