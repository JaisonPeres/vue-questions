export default () => {
  return [
    {
      label: 'Disciplinas e Assuntos',
      field: 'search',
      value: null,
      size: 12
    },
    {
      label: 'Banca',
      field: 'jury',
      value: null,
      options: [
        {
          label: 'CESPE',
          value: 'cespe'
        }
      ],
      size: 6
    },
    {
      label: 'Órgão',
      field: 'institute',
      value: null,
      options: [
        {
          label: 'PMDF',
          value: 'pmdf'
        }
      ],
      size: 6
    },
    {
      label: 'Ano',
      field: 'year',
      value: null,
      options: [
        {
          label: '2015',
          value: '2015'
        },
        {
          label: '2016',
          value: '2016'
        }
      ],
      size: 6
    },
    {
      label: 'Cargo',
      field: 'place',
      value: null,
      options: [
        {
          label: 'Agente 1',
          value: 'agente-1'
        },
        {
          label: 'Agente 2',
          value: 'agente-2'
        }
      ],
      size: 6
    },
    {
      label: 'Nível',
      field: 'level',
      value: null,
      options: [
        {
          label: 'Superior',
          value: 'superior'
        },
        {
          label: 'Médio',
          value: 'medio'
        }
      ],
      size: 6
    },
    {
      label: 'Tipo de questão',
      field: 'alternative_number',
      value: null,
      options: [
        {
          label: 'Certo e Errado',
          value: '2'
        },
        {
          label: 'Múltipla Escolha',
          value: '4'
        }
      ],
      size: 6
    }
  ]
}
